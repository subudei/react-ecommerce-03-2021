import { useAdminAuth } from "../custom-hooks/customHooksRoot";
const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export default WithAdminAuth;
