// hook that subscribes to a pusher channel and returns the channel object

import { useEffect, useState } from 'react';
import type { Channel } from 'pusher-js';
import Pusher from 'pusher-js';
import { env } from '../env/client.mjs';

export const usePusher = () => {
    const [pusher, setPusher] = useState<Pusher | null>(null);

    useEffect(() => {
        const pusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
        });
        setPusher(pusherClient);
        return () => {
            pusherClient.disconnect();
        };
    }, []);

    return pusher;
};
