import { Vue, Component } from "vue-property-decorator";
import { Notify } from "@/store/app/types";

@Component
export class NotifyMixin extends Vue {
  public notifyModel: Notify = {
    open: true,
    text: "",
    colorBtn: "",
    colorText: "",
  };

  ok(text = ""): void {
    this.baseNotification(
      text || (this.$t("statusCode.ok.text") as string),
      "white",
      "green"
    );

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  noContent(text = "") {
    this.baseNotification(
      text || (this.$t("statusCode.noContent.text") as string),
      "white",
      "green"
    );

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  badRequest(text = ""): void {
    this.baseNotification(
      text || (this.$t("statusCode.badRequest.text") as string),
      "orange",
      "orange"
    );

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  notFound(text = "") {
    this.baseNotification(
      text || (this.$t("statusCode.notFound.text") as string),
      "orange",
      "orange"
    );

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  internalServerError(text = "") {
    this.baseNotification(
      text || (this.$t("statusCode.internalServerError.text") as string),
      "white",
      "red"
    );

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  baseNotification(text: string, colorText: string, colorBtn = "") {
    this.notifyModel.open = true;
    this.notifyModel.text = text;
    this.notifyModel.colorText = colorText;
    this.notifyModel.colorBtn = colorBtn;
  }

  customError(status: number, text = "") {
    const badRequest: number = parseInt(
      this.$t("statusCode.badRequest.status").toString()
    );
    const internalServerError: number = parseInt(
      this.$t("statusCode.internalServerError.status").toString()
    );
    const notFound: number = parseInt(
      this.$t("statusCode.notFound.status").toString()
    );

    switch (status) {
      case badRequest:
        this.badRequest(text);
        break;

      case notFound:
        this.notFound(text);
        break;

      case internalServerError:
        this.internalServerError(text);
        break;
    }
  }
}
