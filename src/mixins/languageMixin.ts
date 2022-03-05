import { Vue, Component } from "vue-property-decorator";

@Component
export class LanguageMixin extends Vue {
  mounted(): void {
    this.setLanguageCurrent();
  }

  setLanguageCurrent(language = ""): void {
    const languages: Array<string> = this.$store.getters["app/getLanguages"];

    let languageSelected = "";

    if (languages.length && languages.includes(language) && language) {
      languageSelected = language;
    } else if (languages.length && !languages.includes(language) && language) {
      languageSelected = languages[0];
    } else {
      languageSelected = "";
    }

    if (languageSelected) this.setLanguageIntoSystem(languageSelected);
  }

  setLanguageIntoSystem(language = ""): void {
    const languageIntoLocalStorage = this.getLanguageLocalStore;
    (this as any).$vuetify.lang.current = !languageIntoLocalStorage
      ? language
      : languageIntoLocalStorage;

    this.setLanguageIntoLocalStorage(language);
  }

  setLanguageIntoLocalStorage(language: string): void {
    (this as any).$i18n.locale = language;
    localStorage.setItem("language-current-system", language);
  }

  get getLanguageLocalStore(): string {
    const language = localStorage.getItem("language-current-system") as string;

    (this as any).$i18n.locale = language;

    return language;
  }
}
