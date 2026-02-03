/**
 * Auto-generated TypeScript definitions for i18n dictionaries
 *
 * @author copilot
 */

export type Dictionary = {
      account: {
        title: string
        description: string
        accept: string
        content0: string
        content1: string
        conflict: {
          content0: (value: any) => string
          content1: string
        }
        switch: string
        expired: {
          content: string
          description: string
          title: string
        }
        og: {
          tile: string
          description: (value: any) => string
        }
      }
      actions: {
        discard: string
        close: string
      }
      friends: {
        app: {
          description: string
        }
        inviter: {
          description: (value: any) => string
        }
        accept: string
        og: {
          description: string
          title: (value: any) => string
        }
        dialog: {
          title: string
          description: string
          accept: string
          decline: string
          content: (value: any) => string
        }
      }
      group: {
        og: {
          title: (value: any) => string
          description: (value: any) => string
        }
        dialog: {
          title: (value: any) => string
          join: string
          decline: string
        }
      }
    }
