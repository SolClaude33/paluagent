// WebSocket endpoint for Vercel
export default function handler(req, res) {
  // Vercel doesn't support WebSocket in serverless functions
  // This is a placeholder - WebSocket functionality would need a different approach
  res.status(501).json({ 
    message: 'WebSocket not supported in Vercel serverless functions',
    note: 'Consider using Socket.io with polling or a separate WebSocket service'
  });
}
