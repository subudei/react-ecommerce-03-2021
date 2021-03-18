import { useAuth } from "../custom-hooks/customHooksRoot";

const WithAuth = (props) => useAuth(props) && props.children;

export default WithAuth;
