var tempSnmpServers = [];
for (var i = 0; i < this.snmp_servers.length; i++) {
  let temp = this.snmp_servers[i];
  let tempIp = temp.vseip;
  let tempName = temp.vseName;
  let tempVersion = temp.snmp_version;
  let tempConfig = temp.config; //交换机配置
  if (tempConfig.length > 48) {
    this.$message.error(
      this.$t("accessControl.switchLinkage.config_error_num").formatVueText(
        tempName
      )
    );
    return;
  }
  let tempConfStrArr = [];
  let ips = [];
  for (let ti in tempConfig) {
    let tConf = tempConfig[ti];
    ips.push(tConf.ip);
    let lineIndex = parseInt(ti) + 1;

    if (!checkIp(tConf.ip)) {
      this.$message.error(
        this.$t("accessControl.switchLinkage.config_error_ip").formatVueText(
          numberToIp(tempIp),
          lineIndex
        )
      );
      return;
    }
    if (this.uniqueArr(ips).length != ips.length) {
      this.$message.error(
        this.$t(
          "accessControl.switchLinkage.config_error_ip_same"
        ).formatVueText(numberToIp(tempIp), lineIndex)
      );
      return;
    }
    if (!checkIsNotNullOrUndefined(tConf.passwd)) {
      this.$message.error(
        this.$t(
          "accessControl.switchLinkage.config_error_passwd"
        ).formatVueText(numberToIp(tempIp), lineIndex)
      );
      return;
    }
    if (!tConf.authpriv && tempVersion == "3") {
      this.$message
        .error("加密认证不能为空")
        .formatVueText(numberToIp(tempIp), lineIndex);
      return;
    }

    if (tConf.authpriv === "authpriv" && tempVersion == "3") {
      if (!tConf.authmod) {
        this.$message.error("认证方式不能为空");
        return;
      }
      if (!tConf.authphrase) {
        this.$message.error("认证密码不能为空");
        return;
      }
      if (!tConf.priv_method) {
        this.$message.error("加密方式不能为空");
        return;
      }
      if (!tConf.privphrase) {
        this.$message.error("加密密码不能为空");
        return;
      }
    } else {
      tConf.authmod = "";
      tConf.authphrase = "";
      tConf.priv_method = "";
      tConf.privphrase = "";
    }

    /* 组装数据 */
    let tempStr;
    if (tempVersion == "2") {
      tempStr = tConf.ip + "/" + tConf.model + "/" + tConf.passwd;
    } else if (tempVersion == "3" && tConf.authpriv == "noauth") {
      tempStr =
        tConf.ip +
        "/" +
        tConf.mac +
        "/" +
        tConf.model +
        "/" +
        tConf.passwd +
        "/" +
        tConf.authpriv;
    } else {
      tempStr =
        tConf.ip +
        "/" +
        tConf.mac +
        "/" +
        tConf.model +
        "/" +
        tConf.passwd +
        "/" +
        tConf.authpriv +
        "/" +
        tConf.authmod +
        "/" +
        tConf.authphrase +
        "/" +
        tConf.priv_method +
        "/" +
        tConf.privphrase;
    }

    tempConfStrArr.push(tempStr);
  }

  if (tempVersion != "2" && tempVersion != "3") {
    this.$message.error(
      this.$t("accessControl.switchLinkage.snmp_version_error").formatVueText(
        numberToIp(tempIp)
      )
    );
    return;
  }

  tempSnmpServers.push({
    vseip: tempIp + "",
    snmp_version: tempVersion,
    config: tempConfStrArr.join(";"),
    vsename: tempName,
  });
}

if (
  !isPositiveInteger(this.overtime) ||
  !isNumBetween(parseInt(this.overtime), 1, 5)
) {
  this.$message.error(this.$t("accessControl.switchLinkage.overtime_error"));
  return;
}

if (
  !isPositiveInteger(this.access_interval) ||
  !isNumBetween(parseInt(this.access_interval), 5, 300)
) {
  this.$message.error(
    this.$t("accessControl.switchLinkage.access_interval_error")
  );
  return;
}
