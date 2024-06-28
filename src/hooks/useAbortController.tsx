export default function useAbortController() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 60000);

  return { controller, timeoutId };
}
