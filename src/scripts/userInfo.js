export class UserInfo {
  constructor(jobElement, nameElement, job, name) {
    this.jobElement = jobElement;
    this.nameElement = nameElement;
    this.job = job;
    this.name = name;
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  setUserInfo(name, job) {
    this.name = name;
    this.job = job;
  }

  updateUserInfo() {
    this.nameElement.textContent = this.name;
    this.jobElement.textContent = this.job;
  }
}