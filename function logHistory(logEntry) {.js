function createHistoryManager(limit = 5) {
  const history = [];

  return {
    add(entry) {
      history.push(entry);
      if (history.length > limit) {
        history.shift();
      }
    },
    getAll() {
      return [...history];
    },
    clear() {
      history.length = 0;
    }
  };
}
