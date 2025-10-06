import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { generateAIResponse } from "./ai-service";
import { chatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');

    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'user_message') {
          const userMessage = {
            id: Date.now().toString(),
            message: message.content,
            sender: 'user' as const,
            username: message.username || 'Anónimo',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'user_message',
                data: userMessage
              }));
            }
          });

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'max_emotion',
                data: { emotion: 'thinking' }
              }));
            }
          });

          const aiResponse = await generateAIResponse(message.content);

          const maxMessage = {
            id: (Date.now() + 1).toString(),
            message: aiResponse.message,
            sender: 'max' as const,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            emotion: aiResponse.emotion,
          };

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'max_emotion',
                data: { emotion: aiResponse.emotion }
              }));
            }
          });

          setTimeout(() => {
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type: 'max_message',
                  data: maxMessage
                }));
              }
            });

            setTimeout(() => {
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({
                    type: 'max_emotion',
                    data: { emotion: 'idle' }
                  }));
                }
              });
            }, 3000);
          }, 500);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    ws.send(JSON.stringify({
      type: 'connection',
      data: { message: 'Connected to Max AI Stream' }
    }));
  });

  return httpServer;
}
