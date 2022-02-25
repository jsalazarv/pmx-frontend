import { Vue, Component } from "vue-property-decorator";

@Component
export class LanguageMixin extends Vue {
  mounted(): void {
    this.setLanguageCurrent();
  }

  setLanguageCurrent(language = ""): void {
    const languages: Array<string> = this.$store.getters["app/getLanguages"];
    if (languages.length && languages.includes(language)) {
      (this as any).$vuetify.lang.current = language;
    } else {
      (this as any).$vuetify.lang.current = languages[0];
    }
  }
}
