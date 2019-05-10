import _ from "lodash";
import { QueryCtrl } from 'grafana/app/plugins/sdk';

export class AwsCloudWatchLogsDatasourceQueryCtrl extends QueryCtrl {
  scope: any;
  target: any;
  panelCtrl: any;
  templateSrv: any;
  datasource: any;
  defaultRegion: string;
  suggestLogGroupName: any;
  suggestLogStreamName: any;
  static templateUrl = 'partials/query.editor.html';

  constructor($scope, $injector, templateSrv) {
    super($scope, $injector);

    this.scope = $scope;
    this.target.format = this.target.format || 'table';
    this.target.region = this.target.region || '';
    this.target.logGroupName = this.target.logGroupName || '';
    this.target.logStreamNames = this.target.logStreamNames || [];
    this.target.filterPattern = this.target.filterPattern || '';
    this.target.queryString = this.target.queryString || '';

    // backward compatibility
    if (_.isNumber(this.target.limit)) {
      this.target.limit = String(this.target.limit);
    }

    this.target.limit = this.target.limit || '10000';
    this.target.legendFormat = this.target.legendFormat || '';
    this.target.timestampColumn = this.target.timestampColumn || '';
    this.target.valueColumn = this.target.valueColumn || '';
    this.templateSrv = templateSrv;

    this.suggestLogGroupName = (query, callback) => {
      let region = this.target.region || this.defaultRegion;
      return this.datasource.doMetricQueryRequest('log_group_names', {
        region: this.templateSrv.replace(region),
        logGroupNamePrefix: query
      }).then(data => {
        callback(data.map(d => { return d.value; }));
      });
    };

    this.suggestLogStreamName = (query, callback) => {
      if (!this.target.logGroupName) {
        return callback([]);
      }
      let region = this.target.region || this.defaultRegion;
      return this.datasource.doMetricQueryRequest('log_stream_names', {
        region: this.templateSrv.replace(region),
        logGroupName: this.target.logGroupName,
        logStreamNamePrefix: query
      }).then(data => {
        callback(data.map(d => { return d.value; }));
      });
    };
  }

  onChangeInternal() {
    this.panelCtrl.refresh();
  }
}
