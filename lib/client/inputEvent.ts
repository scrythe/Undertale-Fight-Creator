import EventEmitter from 'events';

interface Events {
  sendNumber(a: string, b: number): void;
  yeet(): void;
}

type EventNames = keyof Events;
type EvemtListener<Event extends EventNames> = Events[Event];
type EventParameters<Event extends EventNames> = Parameters<
  EvemtListener<Event>
>;

class InputEvents extends EventEmitter {
  override on<Event extends EventNames>(
    eventName: Event,
    listener: EvemtListener<Event>
  ) {
    return super.on(eventName, listener);
  }

  override emit<Event extends EventNames>(
    eventName: Event,
    ...args: EventParameters<Event>
  ) {
    return super.emit(eventName, args);
  }
}

const inputEvents = new InputEvents();

export default inputEvents;

inputEvents.on('sendNumber', (a) => console.log(a));
inputEvents.emit('sendNumber', 'a', 2);

InputEvents;
