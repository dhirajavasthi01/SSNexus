const defaultAppName = "SS Nexus"

function readAppName() {
  const configuredName = import.meta.env.VITE_APP_NAME?.trim()

  if (configuredName) {
    return configuredName
  }

  return defaultAppName
}

export const appConfig = {
  name: readAppName(),
}
