export const eventsHandler = (() => {
  let events = {};

  return {
    on(eventName, fn) {
      events[eventName] = events[eventName] || [];
      events[eventName].push(fn);
    },

    off(eventName, removedFn) {
      if (events[eventName]) {
        events[eventName] = events[eventName].filter((fn) => fn !== removedFn);
      }
    },

    trigger(eventName, data) {
      if (events[eventName]) {
        events[eventName].forEach((fn) => {
          fn(data);
        });
      }
    },
  };
})();
