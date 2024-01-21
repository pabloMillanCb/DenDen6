import Session from "./session";

type SessionMap = { id: number; session: Session };
let App : Map<number, Session> = new Map<number, Session>();

export default App