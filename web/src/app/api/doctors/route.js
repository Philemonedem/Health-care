import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const specialization = searchParams.get('specialization');
    const limit = searchParams.get('limit') || null;

    let query = `
      SELECT 
        id,
        name,
        specialization,
        hospital,
        email,
        phone,
        bio,
        experience_years,
        avatar_url,
        available,
        consultation_fee,
        rating,
        total_reviews,
        created_at
      FROM doctors 
      WHERE available = true
    `;
    const params = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      query += ` AND (
        LOWER(name) LIKE LOWER($${paramCount})
        OR LOWER(specialization) LIKE LOWER($${paramCount})
        OR LOWER(hospital) LIKE LOWER($${paramCount})
      )`;
      params.push(`%${search}%`);
    }

    if (specialization) {
      paramCount++;
      query += ` AND LOWER(specialization) = LOWER($${paramCount})`;
      params.push(specialization);
    }

    query += ` ORDER BY rating DESC, total_reviews DESC`;

    if (limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      params.push(parseInt(limit));
    }

    const doctors = await sql(query, params);

    return Response.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return Response.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      specialization,
      hospital,
      email,
      phone,
      bio,
      experience_years,
      avatar_url,
      consultation_fee
    } = body;

    if (!name || !specialization || !hospital || !email) {
      return Response.json(
        { error: 'Name, specialization, hospital, and email are required' },
        { status: 400 }
      );
    }

    const doctor = await sql`
      INSERT INTO doctors (
        name,
        specialization,
        hospital,
        email,
        phone,
        bio,
        experience_years,
        avatar_url,
        consultation_fee
      ) VALUES (
        ${name},
        ${specialization},
        ${hospital},
        ${email},
        ${phone || null},
        ${bio || null},
        ${experience_years || 0},
        ${avatar_url || null},
        ${consultation_fee || 0.00}
      )
      RETURNING *
    `;

    return Response.json(doctor[0], { status: 201 });
  } catch (error) {
    console.error('Error creating doctor:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      return Response.json(
        { error: 'A doctor with this email already exists' },
        { status: 409 }
      );
    }
    
    return Response.json(
      { error: 'Failed to create doctor' },
      { status: 500 }
    );
  }
}