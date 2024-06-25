import handleError from "@/libs/error-handler";

export default async function Test() {
  async function send() {
    "use server";

    try {
      throw new Error("Test");
    } catch (error) {
      await handleError(error);
    }
  }

  return (
    <form action={send}>
      <h1 className="text-lg">error test</h1>
      <button>send</button>
    </form>
  );
}
