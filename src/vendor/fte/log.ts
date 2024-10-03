export function enableLogToEvents() {
  const log = console.log;

  function customLog(...args: any[]) {
    inspectMessage(args[0]);
    log.apply(console, args);
  }

  console.log = customLog;
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

function eventByMessage(message: string): Event | null {
  switch (message) {
    case "WebGL renderer initialized":
      return new Event("fte.event.ready");
    case "fte.trigger.f_newmap":
      return new Event("fte.trigger.f_newmap");
    default:
      return null;
  }
}
