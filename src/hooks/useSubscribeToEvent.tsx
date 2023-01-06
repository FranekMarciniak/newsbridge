import { useEffect } from 'react';
import type { Channels, Events } from '../server/pusher/types';
import { usePusher } from './usePusher';

export const useSubscribeToEvent = ({
    channelName,
    eventName,
    callback,
}: {
    channelName: Channels;
    eventName: Events;
    callback: (data: any) => void;
}) => {
    const pusher = usePusher();
    useEffect(() => {
        if (pusher) {
            const channel = pusher.subscribe(channelName);
            channel.bind(eventName, callback);
        }
    }, [pusher]);

    return { pusher };
};
