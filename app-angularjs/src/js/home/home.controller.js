import VanillaChart from 'admetricks/VanillaChart';
import store, { setData } from 'admetricks/store';

class HomeCtrl {
  constructor(AppConstants) {
    'ngInject';

    this.appName = AppConstants.appName;
    const data = [
      {
        name: 'falabella',
        reach: 0.54,
        frequency: 8.13
      },
      {
        name: 'paris',
        reach: 0.25,
        frequency: 3.06
      }
    ]
    setData(data)
    VanillaChart("#chart");
  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }

  addData () {
    const data = store.data
    data[0].reach = +(data[0].reach + 1).toFixed(2)
    data[0].frequency = +(data[0].frequency + 1).toFixed(2)
    data[1].reach = +(data[1].reach + 1).toFixed(2)
    data[1].frequency = +(data[1].frequency + 1).toFixed(2)
    setData(data)
  }

  reduceData () {
    const data = store.data
    data[0].reach = +(data[0].reach - 1).toFixed(2)
    data[0].frequency = +(data[0].frequency - 1).toFixed(2)
    data[1].reach = +(data[1].reach - 1).toFixed(2)
    data[1].frequency = +(data[1].frequency - 1).toFixed(2)
    setData(data)
  }

}

export default HomeCtrl;
