import fs from "fs";
import path from "path";
import util from "util";

// the following requires Node 8 minimum.
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);

const getProjectName = async (workspaceRoot: string): Promise<string> => {
  if (await exists(path.resolve(workspaceRoot, "package.json"))) {
    const buffer = readFile(path.resolve(workspaceRoot, "package.json"));
    const json = JSON.parse((await buffer).toString());
    return json.displayName || json.name;
  }

  return "default";
};

const getTsConfig = async (workspaceRoot: string): Promise<string | undefined> => {
  const tsConfigPath = path.resolve(workspaceRoot, "tsconfig.json");
  if (await exists(tsConfigPath)) {
    return tsConfigPath;
  }

  return undefined;
};

export { getProjectName, getTsConfig };
