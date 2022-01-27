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
    this.notifyModel.open = true;
    this.notifyModel.text = text || (this.$t("statusCode.ok.text") as string);
    this.notifyModel.colorText = "green";
    this.notifyModel.colorBtn = "green";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  noContent(text = "") {
    this.notifyModel.open = true;
    this.notifyModel.text =
      text || (this.$t("statusCode.noContent.text") as string);
    this.notifyModel.colorText = "green";
    this.notifyModel.colorBtn = "green";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  badRequest(text = ""): void {
    this.notifyModel.open = true;
    this.notifyModel.text =
      text || (this.$t("statusCode.badRequest.text") as string);
    this.notifyModel.colorText = "orange";
    this.notifyModel.colorBtn = "orange";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  notFound(text = "") {
    this.notifyModel.open = true;
    this.notifyModel.text =
      text || (this.$t("statusCode.notFound.text") as string);
    this.notifyModel.colorText = "orange";
    this.notifyModel.colorBtn = "orange";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  internalServerError(text = "") {
    this.notifyModel.open = true;
    this.notifyModel.text =
      text || (this.$t("statusCode.internalServerError.text") as string);
    this.notifyModel.colorText = "white";
    this.notifyModel.colorBtn = "red";

    this.$store.dispatch("app/setNotify", this.notifyModel);
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

  mounted(): void {}
}
