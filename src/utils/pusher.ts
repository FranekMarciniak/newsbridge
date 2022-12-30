import PusherServer from 'pusher';
import { env } from '../env/server.mjs';
import type { Channels, Events } from '../server/pusher/types.js';

export const pusherServerClient = new PusherServer({
    appId: env.PUSHER_APP_ID,
    key: env.PUSHER_KEY,
    secret: env.PUSHER_SECRET,
    cluster: env.PUSHER_CLUSTER,
    useTLS: true,
});

interface TriggerProps {
    channel: Channels;
    event: Events;
    data?: Record<string, unknown>;
}
export const trigger = async ({ channel, event, data }: TriggerProps) => {
    await pusherServerClient.trigger(channel, event, data);
};
