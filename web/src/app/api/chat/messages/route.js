import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Placeholder AI response function - replace with actual AI integration
const generateAIResponse = async (userMessage, conversationHistory = []) => {
  // This is a placeholder that will be replaced with actual AI integration
  // based on the user's selection (ChatGPT, Claude, etc.)
  
  const healthKeywords = ['pain', 'hurt', 'sick', 'fever', 'headache', 'cough', 'cold', 'flu', 'tired', 'dizzy'];
  const emergencyKeywords = ['chest pain', 'heart attack', 'stroke', 'bleeding', 'emergency', 'urgent'];
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for emergency keywords
  if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      response: "⚠️ This sounds like it could be a medical emergency. Please call emergency services immediately (911) or go to your nearest emergency room. I'm not a substitute for emergency medical care.",
      confidence: 0.95,
      urgency: 'high'
    };
  }
  
  // Check for health-related keywords
  if (healthKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      response: "I understand you're experiencing some health concerns. While I can provide general health information, it's important to consult with a healthcare professional for proper diagnosis and treatment. Would you like me to help you find a doctor or should I provide some general health information about your symptoms?",
      confidence: 0.85,
      urgency: 'medium'
    };
  }
  
  // Doctor-related queries
  if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment')) {
    return {
      response: "I can help you find and book appointments with qualified doctors. We have specialists in various fields including cardiology, pediatrics, dermatology, and general practice. Would you like me to show you available doctors or help you book an appointment?",
      confidence: 0.9,
      urgency: 'low'
    };
  }
  
  // General health tips
  if (lowerMessage.includes('health tips') || lowerMessage.includes('healthy')) {
    return {
      response: "Here are some general health tips:\n\n• Eat a balanced diet with plenty of fruits and vegetables\n• Exercise regularly - at least 30 minutes most days\n• Get 7-9 hours of sleep each night\n• Stay hydrated by drinking plenty of water\n• Manage stress through relaxation techniques\n• Schedule regular check-ups with your healthcare provider\n\nWould you like more specific information about any of these topics?",
      confidence: 0.95,
      urgency: 'low'
    };
  }
  
  // Default response
  return {
    response: "Thank you for your message. I'm here to help with health-related questions and connect you with medical professionals. I can:\n\n• Provide general health information\n• Help you find and book appointments with doctors\n• Assist with symptom assessment (not a substitute for professional diagnosis)\n• Connect you with emergency resources if needed\n\nHow can I assist you with your health concerns today?",
    confidence: 0.75,
    urgency: 'low'
  };
};

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
    const { conversation_id, message_text } = body;

    if (!conversation_id || !message_text) {
      return Response.json(
        { error: 'Conversation ID and message text are required' },
        { status: 400 }
      );
    }

    // Verify user owns the conversation
    const conversation = await sql`
      SELECT * FROM chat_conversations 
      WHERE id = ${conversation_id} AND user_id = ${session.user.id}
    `;

    if (conversation.length === 0) {
      return Response.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Get recent conversation history for context
    const recentMessages = await sql`
      SELECT message_text, sender_type, created_at
      FROM chat_messages 
      WHERE conversation_id = ${conversation_id}
      ORDER BY created_at DESC 
      LIMIT 10
    `;

    // Save user message
    const userMessage = await sql`
      INSERT INTO chat_messages (
        conversation_id,
        sender_type,
        sender_id,
        message_text,
        message_type,
        is_ai_generated
      ) VALUES (
        ${conversation_id},
        'user',
        ${session.user.id},
        ${message_text},
        'text',
        false
      )
      RETURNING *
    `;

    // Generate AI response
    const aiResult = await generateAIResponse(message_text, recentMessages.reverse());
    
    // Save AI response
    const aiMessage = await sql`
      INSERT INTO chat_messages (
        conversation_id,
        sender_type,
        sender_id,
        message_text,
        message_type,
        is_ai_generated,
        ai_confidence
      ) VALUES (
        ${conversation_id},
        'ai',
        null,
        ${aiResult.response},
        'text',
        true,
        ${aiResult.confidence}
      )
      RETURNING *
    `;

    // Update conversation timestamp
    await sql`
      UPDATE chat_conversations 
      SET updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${conversation_id}
    `;

    return Response.json({
      user_message: userMessage[0],
      ai_response: aiResult.response,
      confidence: aiResult.confidence,
      urgency: aiResult.urgency,
      ai_message_id: aiMessage[0].id
    });

  } catch (error) {
    console.error('Error processing chat message:', error);
    return Response.json(
      { error: 'Failed to process message' },
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
    const conversation_id = searchParams.get('conversation_id');
    const limit = searchParams.get('limit') || 50;
    const offset = searchParams.get('offset') || 0;

    if (!conversation_id) {
      return Response.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    // Verify user owns the conversation
    const conversation = await sql`
      SELECT * FROM chat_conversations 
      WHERE id = ${conversation_id} AND user_id = ${session.user.id}
    `;

    if (conversation.length === 0) {
      return Response.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Get messages
    const messages = await sql`
      SELECT 
        id,
        sender_type,
        sender_id,
        message_text,
        message_type,
        file_url,
        is_ai_generated,
        ai_confidence,
        created_at
      FROM chat_messages 
      WHERE conversation_id = ${conversation_id}
      ORDER BY created_at ASC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return Response.json(messages);

  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return Response.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}