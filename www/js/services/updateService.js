var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class UpdateService {
    constructor($rootScope, $ionicModal, $ionicPopup, $http, $cordovaAppVersion, $cordovaFileTransfer, appConfig) {
        this.$rootScope = $rootScope;
        this.$ionicModal = $ionicModal;
        this.$ionicPopup = $ionicPopup;
        this.$http = $http;
        this.$cordovaAppVersion = $cordovaAppVersion;
        this.$cordovaFileTransfer = $cordovaFileTransfer;
        this.appConfig = appConfig;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            let localVersion = yield this.$cordovaAppVersion.getVersionNumber();
            let v = yield this.$http.get(this.appConfig.updateUrl + 'version.json' + "?ts=" + Date.now(), {
                cache: false
            });
            if (v.data == null) {
                yield this.$ionicPopup.alert({ title: "无法连接更新服务器" });
                return;
            }
            let serverVersion = v.data.version;
            if (localVersion == serverVersion) {
                yield this.$ionicPopup.alert({ title: '已经是最新版本' });
                return;
            }
            let userConfirm = yield this.$ionicPopup.confirm({
                title: "发现新版本",
                template: "现在立即更新吗?",
                okText: "确定",
                cancelText: "取消"
            });
            if (!userConfirm)
                return;
            var progressModal = yield this.$ionicModal.fromTemplate(progressTemplet, {
                scope: this.$rootScope,
                backdropClickToClose: true,
                hardwareBackButtonClose: true
            });
            var url = this.appConfig.updateUrl + "szwchyCar.apk";
            var filename = url.split("/").pop();
            var targetPath;
            if (cordova.file.externalDataDirectory !== null) {
                targetPath = cordova.file.externalDataDirectory + filename;
            }
            else {
                targetPath = cordova.file.dataDirectory + filename;
            }
            progressModal.show();
            var downloadSucces = true;
            this.$rootScope.downloadProgress = 0;
            yield this.$cordovaFileTransfer.download(url, targetPath, {}, true)
                .then((result) => {
                downloadSucces = true;
            }, (error) => {
                downloadSucces = false;
                console.log(JSON.stringify(error));
                this.$ionicPopup.alert({ title: '下载文件发生错误' });
            }, (progress) => {
                this.$rootScope.downloadProgress = (progress.loaded / progress.total) * 100;
            });
            progressModal.hide();
            if (!downloadSucces)
                return;
            var plugin;
            plugin = window.plugins;
            plugin.webintent.startActivity({
                action: plugin.webintent.ACTION_VIEW,
                url: targetPath,
                type: 'application/vnd.android.package-archive'
            }, () => { }, (e) => {
                this.$ionicPopup.alert({ title: "安装程序发生错误" });
            });
        });
    }
}
var progressTemplet = `
    <ion-modal-view>
        <ion-header-bar class="bar bar-header bar-positive">
            <h1 class="title">正在下载,请稍候</h1>
        </ion-header-bar>
        <ion-content class="padding">
            <div class="bar bar-subheader bar-positive" style="padding:0px;height: 8px;top:30%">
                <progress id="progressbar" max="100" value="{{ downloadProgress }}" class="progress"> </progress>
            </div>
        </ion-content>
    </ion-modal-view>
`;
angular.module('starter.services').service('UpdateService', UpdateService);
//# sourceMappingURL=updateService.js.map