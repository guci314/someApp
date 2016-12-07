interface IVersion {
    version: string;
}

/**
 * 更新服务
 */
class UpdateService {

    private $rootScope: any;
    //private $ionicPlatform: ionic.platform.IonicPlatformService;
    private $ionicModal: ionic.modal.IonicModalService;
    private $ionicPopup: ionic.popup.IonicPopupService;
    private $http: ng.IHttpService;
    private $cordovaAppVersion: any;
    private $cordovaFileTransfer: any;
    private appConfig: IAppConfig;

    constructor($rootScope: any, $ionicModal: any, $ionicPopup: any, $http: any, $cordovaAppVersion: any, $cordovaFileTransfer: any, appConfig: any) {
        this.$rootScope = $rootScope;
        //this.$ionicPlatform = $ionicPlatform;
        this.$ionicModal = $ionicModal;
        this.$ionicPopup = $ionicPopup;
        this.$http = $http;
        this.$cordovaAppVersion = $cordovaAppVersion;
        this.$cordovaFileTransfer = $cordovaFileTransfer;
        this.appConfig = appConfig;
    }

    /**
     * 检测新版本，并询问用户是否更新
     */
    async checkNewVersion(): Promise<boolean> {
        let localVersion = await this.$cordovaAppVersion.getVersionNumber();
        let v = await this.$http.get(this.appConfig.updateUrl + 'version.json' + "?ts=" + Date.now(), {
            cache: false
        });
        if (v.data == null) {
            //await this.$ionicPopup.alert({title:"无法连接更新服务器"});
            return false;
        }
        let serverVersion = (v.data as IVersion).version;
        if (localVersion == serverVersion) {
            //await this.$ionicPopup.alert({title:'已经是最新版本'});
            return false;
        }
        let userConfirm: boolean = await this.$ionicPopup.confirm({
            title: "发现新版本",
            template: "现在立即更新吗?",
            okText: "确定",
            cancelText: "取消"
        });

        return userConfirm;
    }

    /**
     * 安装新版本
     */
    async install() {
        var progressModal = await this.$ionicModal.fromTemplate(progressTemplet, {
            scope: this.$rootScope,
            backdropClickToClose: true,
            hardwareBackButtonClose: true
        });

        var url = this.appConfig.updateUrl + "szwchyCar.apk";
        var filename = url.split("/").pop();
        var targetPath: string;
        //externalDataDirectory documentsDirectory .cacheDirectory applicationStorageDirectory externalRootDirectory + 'Pictures/' dataDirectory applicationDirectory
        if (cordova.file.externalDataDirectory !== null) {
            targetPath = cordova.file.externalDataDirectory + filename;
        } else {
            targetPath = cordova.file.dataDirectory + filename;
        }
        progressModal.show();
        var downloadSucces: boolean = true;
        this.$rootScope.downloadProgress = 0;
        await this.$cordovaFileTransfer.download(url, targetPath, {}, true)
            .then((result: any) => {
                downloadSucces = true;
            },
            (error: any) => {
                downloadSucces = false;
                console.log(JSON.stringify(error));
                this.$ionicPopup.alert({ title: '下载文件发生错误',okText:"确定" });
            },
            (progress: any) => {
                this.$rootScope.downloadProgress = (progress.loaded / progress.total) * 100;
            });
        progressModal.hide();
        if (!downloadSucces) return;

        var plugin: any;
        plugin = window.plugins;
        plugin.webintent.startActivity({
            action: plugin.webintent.ACTION_VIEW,
            url: targetPath,
            type: 'application/vnd.android.package-archive' //'text/plain' //'application/vnd.android.package-archive'
        },
            () => { },
            (e: any) => {
                this.$ionicPopup.alert({ title: "安装程序发生错误" ,okText:"确定"});
            }
        );
    }

    /**
     * 检测更新，用户选择是否安装
     */
    async update() {
        //await this.$ionicPlatform.ready();
        let localVersion = await this.$cordovaAppVersion.getVersionNumber();
        let v = await this.$http.get(this.appConfig.updateUrl + 'version.json' + "?ts=" + Date.now(), {
            cache: false
        });
        if (v.data == null) {
            await this.$ionicPopup.alert({ title: "无法连接更新服务器" ,okText:"确定"});
            return;
        }
        let serverVersion = (v.data as IVersion).version;
        if (localVersion == serverVersion) {
            await this.$ionicPopup.alert({ title: '已经是最新版本' ,okText:"确定"});
            return;
        }
        let userConfirm: boolean = await this.$ionicPopup.confirm({
            title: "发现新版本",
            template: "现在立即更新吗?",
            okText: "确定",
            cancelText: "取消"
        });
        if (!userConfirm) return;

        this.install();
    }
}

var progressTemplet: string = `
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