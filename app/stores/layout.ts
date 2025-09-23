import type { NavigationMenuItem } from '@nuxt/ui'

export const useLayoutStore = defineStore('ui', () => {
  const { t } = useI18n()

  const isMaxSm = useMediaQuery('(width < 40rem)')

  const topLinks = computed<NavigationMenuItem[]>(() => [
    {
      label: t('nav.dashboard'),
      icon: 'i-material-symbols:view-kanban-rounded',
      to: '/',
    },
    {
      label: t('nav.permissions'),
      icon: 'i-material-symbols:shield-locked-rounded',
      children: [
        {
          label: t('nav.roles'),
          icon: 'i-material-symbols:person-edit-rounded',
          to: '/permissions/roles',
        },
        {
          label: t('nav.users'),
          icon: 'i-material-symbols:group-rounded',
          to: '/permissions/users',
        },
      ],
    },
    {
      label: t('nav.settings'),
      icon: 'i-fluent:settings-24-filled',
      children: [
        {
          label: t('nav.general'),
          icon: 'i-fluent:person-24-filled',
          to: '/settings/general',
        },
        {
          label: t('nav.security'),
          icon: 'i-fluent:shield-24-filled',
          to: '/settings/security',
        },
      ],
    },
  ])

  const bottomLinks = computed<NavigationMenuItem[]>(() => [
    {
      label: t('nav.feedback'),
      icon: 'i-fluent:person-feedback-24-filled',
      to: 'https://github.com/chenrui1124/nuxt4-admin',
      target: '_blank',
    },
    {
      label: t('nav.documentation'),
      icon: 'i-fluent:book-24-filled',
      to: 'https://github.com/chenrui1124/nuxt4-admin',
      target: '_blank',
    },
  ])

  const colorModes = computed(() => [
    {
      preference: 'system' as const,
      icon: isMaxSm.value ? 'i-fluent:phone-24-filled' : 'i-fluent:laptop-24-filled',
      label: t('ui.system'),
    },
    {
      preference: 'light' as const,
      icon: 'i-fluent:weather-sunny-24-filled',
      label: t('ui.light'),
    },
    {
      preference: 'dark' as const,
      icon: 'i-fluent:weather-moon-24-filled',
      label: t('ui.dark'),
    },
  ])

  return {
    isMaxSm,
    topLinks,
    bottomLinks,
    colorModes,
  }
})
