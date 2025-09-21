declare module '#app' {
  interface PageMeta {
    group: 'admin' | 'auth'
    i18nKeys?: string[]
  }
}

declare module '#auth-utils' {
  interface User extends UserSelectModel {}
}

export {}
