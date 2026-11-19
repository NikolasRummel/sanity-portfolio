import nextVitals from "eslint-config-next/core-web-vitals";

export default [...nextVitals, { ignores: ["dist/**", ".next/**", "node_modules/**"] }];
