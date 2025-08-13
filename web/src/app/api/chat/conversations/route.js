import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      doctor_id = null, 
      appointment_id = null, 
      conversation_type = 'ai_chat' 
    } = body;

    // Create new conversation
    const conversation = await sql`
      INSERT INTO chat_conversations (
        user_id,
        doctor_id,
        appointment_id,
        conversation_type,
        status
      ) VALUES (
        ${session.user.id},
        ${doctor_id},
        ${appointment_id},
        ${conversation_type},
        'active'
      )
      RETURNING *
    `;

    return Response.json(conversation[0], { status: 201 });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return Response.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const conversation_type = searchParams.get('type');
    const status = searchParams.get('status') || 'active';

    let query = `
      SELECT 
        cc.*,
        d.name as doctor_name,
        d.specialization as doctor_specialization,
        d.avatar_url as doctor_avatar
      FROM chat_conversations cc
      LEFT JOIN doctors d ON cc.doctor_id = d.id
      WHERE cc.user_id = $1 AND cc.status = $2
    `;
    const params = [session.user.id, status];
    let paramCount = 2;

    if (conversation_type) {
      paramCount++;
      query += ` AND cc.conversation_type = $${paramCount}`;
      params.push(conversation_type);
    }

    query += ` ORDER BY cc.updated_at DESC`;

    const conversations = await sql(query, params);

    return Response.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return Response.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}