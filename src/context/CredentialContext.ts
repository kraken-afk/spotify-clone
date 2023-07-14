import { createContext } from "react";

const CredentialContext = createContext<Credential | null>(null);

export default CredentialContext;