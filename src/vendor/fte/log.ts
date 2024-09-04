import { FteEvent } from "./events";

export function enableLogToEvents() {
  const log = console.log;

  function customLog(...args: any[]) {
    if (ignoreMessage(args[0])) {
      return;
    }

    inspectMessage(args[0]);
    log.apply(console, args);
  }

  console.log = customLog;
}

function ignoreMessage(message: any): boolean {
  if (typeof message !== "string") {
    return false;
  }

  const ignored_prefixes = ["Unrecognised ", "execing particles/"];

  for (const prefix of ignored_prefixes) {
    if (message.startsWith(prefix)) {
      return true;
    }
  }

  return false;
}

function inspectMessage(message: any) {
  if (typeof message !== "string") {
    return false;
  }

  const event = eventByMessage(message);

  if (event) {
    window.dispatchEvent(event);
  }
}

function eventByMessage(message: any): CustomEvent | null {
  if (message.startsWith(`streaming "tcp:`)) {
    return new CustomEvent(FteEvent.QtvPlay);
  }

  switch (message) {
    case "svc_disconnect: EndOfDemo":
      return new CustomEvent(FteEvent.QtvDisconnect);
    default:
      return null;
  }
}
