import { Vue, Component } from "vue-property-decorator";

@Component
export class LanguageMixin extends Vue {
  mounted(): void {
    this.setLanguageCurrent();
  }

  setLanguageCurrent(language = ""): void {
    const languages: Array<string> = this.$store.getters["app/getLanguages"];

    const languageSelected: string =
      languages.length && languages.includes(language)
        ? language
        : languages[0];

    this.setLanguageIntoSystem(languageSelected);
  }

  setLanguageIntoSystem(language = ""): void {
    const languageIntoLocalStorage = this.getLanguageLocalStore;
    (this as any).$vuetify.lang.current = !languageIntoLocalStorage
      ? language
      : languageIntoLocalStorage;

    this.setLanguageIntoLocalStorage(language);
  }

  setLanguageIntoLocalStorage(language: string): void {
    localStorage.setItem("language-current-system", language);
  }

  get getLanguageLocalStore(): string {
    return localStorage.getItem(
      "language-current-system"
    ) as string;
  }
}
