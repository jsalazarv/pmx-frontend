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
    this.notifyModel.text = text ?? this.$t("statusCode.ok.text");
    this.notifyModel.colorText = "green";
    this.notifyModel.colorBtn = "green";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  noContent(text = "") {
    this.notifyModel.text = text ?? this.$t("statusCode.noContent.text");
    this.notifyModel.colorText = "green";
    this.notifyModel.colorBtn = "green";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  badRequest(text = ""): void {
    this.notifyModel.text = text ?? this.$t("statusCode.badRequest.text");
    this.notifyModel.colorText = "orange";
    this.notifyModel.colorBtn = "orange";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  notFound(text = "") {
    this.notifyModel.text = text ?? this.$t("statusCode.notFound.text");
    this.notifyModel.colorText = "orange";
    this.notifyModel.colorBtn = "orange";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  internalServerError(text = "") {
    this.notifyModel.text =
      text ?? this.$t("statusCode.internalServerError.text");
    this.notifyModel.colorText = "white";
    this.notifyModel.colorBtn = "red";

    this.$store.dispatch("app/setNotify", this.notifyModel);
  }

  CustomError(status: string, text: string = "") {
    switch (status) {
      case this.$t("statusCode.badRequest.status"):
          this.badRequest(text);
          break;
          
        case this.$t("statusCode.internalServerError.status"):
          this.internalServerError(text);
        break;
    }
  }

  mounted(): void {
    console.log(this.$t("statusCode.ok.text"));
  }
}
