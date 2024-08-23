import { createI18n } from 'vue-i18n'
import en from './langs/en.json'
import uk from './langs/uk.json'

const locale = localStorage.getItem('curLanguageLocale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: locale,
  fallbackLocale: 'en',
  messages: {
    en,
    uk,
  }
})

export default i18n