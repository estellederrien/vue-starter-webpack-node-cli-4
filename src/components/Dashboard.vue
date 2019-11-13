<template>
<div class="container-fluid">

    <div class="row">
        <div class="col-md col-xs-12">
            <div class="card " style="margin-bottom : 20px">

                <div class="card-body">
                    <h5 class="card-title">Indices de ventes</h5>
                    <p class="card-text">Ventes totales .</p>
                    <div>
                        <apexchart type="bar" :options="options_1" :series="series_1"></apexchart>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md col-xs-12">

            <div class="card " style="margin-bottom : 20px">

                <div class="card-body">
                    <h5 class="card-title">Ventes</h5>
                    <p class="card-text">Indice des ventes total.</p>
                    <div id="wrapper">

                        <apexchart type="line" :options="options_2" :series="series_2"></apexchart>

                    </div>
                </div>
            </div>

        </div>

    </div>

    <div class="row">
        <div class="col-sm col-xs-12">

            <div class="card " style="margin-bottom : 20px">

                <div class="card-body">
                    <h5 class="card-title">Distribution</h5>
                    <p class="card-text">Distribution par pays.</p>
                    <div>
                        <apexchart type="bar" :options="options_3" :series="series_3"></apexchart>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm col-xs-12">

            <div class="card " style="margin-bottom : 20px">

                <div class="card-body">
                    <h5 class="card-title">Indice fromage</h5>
                    <p class="card-text">Fromage.</p>
                    <div>
                        <apexchart type="donut" :options="options_4" :series="series_4"></apexchart>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="row">
        <div class="col-lg col-xs-12">
            <div class="card " style="margin-bottom : 20px">

                <div class="card-body">
                    <h5 class="card-title">Zooming</h5>
                    <div id="chart">
                        <div class="toolbar">
                            <button @click="updateData('one_month')" id="one_month" :class="{active: selection==='one_month'}">1M</button>
                            <button @click="updateData('six_months')" id="six_months" :class="{active: selection==='six_months'}">6M</button>
                            <button @click="updateData('one_year')" id="one_year" :class="{active: selection==='one_year'}">1Y</button>
                            <button @click="updateData('ytd')" id="ytd" :class="{active: selection==='ytd'}">YTD</button>
                            <button @click="updateData('all')" id="all" :class="{active: selection==='all'}">ALL</button>
                        </div>
                        <apexchart type=area height=350 :options="chartOptions" :series="series_6" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'Dashboard',
    data: function () {
        return {

            // CHART 1
            options_1: {
                chart: {
                    id: "vuechart-example",
                    foreColor: "#ccc",
                    toolbar: {
                        show: false,
                        autoSelected: "pan"
                    }
                },
                colors: ["#00BAEC"],
                stroke: {
                    width: 3
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series_1: [{
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }],
            // CHART 2
            options_2: {
                chart: {
                    id: "vuechart-example2",
                    type: "line",
                    height: 230,
                    foreColor: "#ccc",
                    toolbar: {
                        autoSelected: "pan",
                        show: false
                    }
                },
                colors: ["#00BAEC"],
                stroke: {
                    width: 3
                },
                xaxis: {
                    type: "datetime"
                },
                markers: {
                    size: 5,
                    colors: ["#000524"],
                    strokeColor: "#00BAEC",
                    strokeWidth: 3
                },
                tooltip: {
                    theme: "dark"
                },
                grid: {
                    borderColor: "#555",
                    clipMarkers: false,
                    yaxis: {
                        lines: {
                            show: false
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    gradient: {
                        enabled: true,
                        opacityFrom: 0.55,
                        opacityTo: 0
                    }
                },
                markers: {
                    size: 5,
                    colors: ["#000524"],
                    strokeColor: "#00BAEC",
                    strokeWidth: 3
                },
                yaxis: {
                    tickAmount: 3,
                    labels: {
                        show: false
                    }
                }
            },
            series_2: [{
                name: "series-2",
                data: this.generateDayWiseTimeSeries(
                    new Date("22 Apr 2017").getTime(),
                    20, {
                        min: 30,
                        max: 90
                    }
                )
            }],

            // CHART 3
            options_3: {
                chart: {
                    width: "100%",
                    height: 380,
                    type: "bar"
                },
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1,
                    colors: ["#fff"]
                },
                legend: {
                    position: "right",
                    verticalAlign: "top",
                    containerMargin: {
                        left: 35,
                        right: 60
                    }
                },
                xaxis: {
                    categories: [
                        "Korea",
                        "Canada",
                        "Poland",
                        "Italy",
                        "France",
                        "Japan",
                        "China"
                    ]
                }
            },
            series_3: [{
                    data: [44, 55, 41, 64, 22, 43, 21]
                },
                {
                    data: [53, 32, 33, 52, 13, 44, 32]
                }
            ],
            // CHART 4
            options_4: {
                chart: {
                    width: 380,
                    type: "donut"
                },
                dataLabels: {
                    enabled: false
                },

                fill: {
                    type: "gradient"
                },
                legend: {
                    formatter: function (val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex];
                    }
                }
            },
            series_4: [44, 55, 41, 17, 15],
            series_5: [
              this.generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
                min: 30,
                max: 90
              })
            ],
      series_6: [
        {
          data: [
            [1327359600000, 30.95],
            [1327446000000, 31.34],
            [1327532400000, 31.18],
            [1327618800000, 31.05],
            [1327878000000, 31.0],
            [1327964400000, 30.95],
            [1328050800000, 31.24],
            [1328137200000, 31.29],
            [1328223600000, 31.85],
            [1328482800000, 31.86],
            [1328569200000, 32.28],
            [1328655600000, 32.1],
            [1328742000000, 32.65],
            [1328828400000, 32.21],
            [1329087600000, 32.35],
            [1329174000000, 32.44],
            [1329260400000, 32.46],
            [1329346800000, 32.86],
            [1329433200000, 32.75],
            [1329778800000, 32.54],
            [1329865200000, 32.33],
            [1329951600000, 32.97],
            [1330038000000, 33.41],
            [1330297200000, 33.27],
            [1330383600000, 33.27],
            [1330470000000, 32.89],
            [1330556400000, 33.1],
            [1330642800000, 33.73],
            [1330902000000, 33.22],
            [1330988400000, 31.99],
            [1331074800000, 32.41],
            [1331161200000, 33.05],
            [1331247600000, 33.64],
            [1331506800000, 33.56],
            [1331593200000, 34.22],
            [1331679600000, 33.77],
            [1331766000000, 34.17],
            [1331852400000, 33.82],
            [1332111600000, 34.51],
            [1332198000000, 33.16],
            [1332284400000, 33.56],
            [1332370800000, 33.71],
            [1332457200000, 33.81],
            [1332712800000, 34.4],
            [1332799200000, 34.63],
            [1332885600000, 34.46],
            [1332972000000, 34.48],
            [1333058400000, 34.31],
            [1333317600000, 34.7],
            [1333404000000, 34.31],
            [1333490400000, 33.46],
            [1333576800000, 33.59],
            [1333922400000, 33.22],
            [1334008800000, 32.61],
            [1334095200000, 33.01],
            [1334181600000, 33.55],
            [1334268000000, 33.18],
            [1334527200000, 32.84],
            [1334613600000, 33.84],
            [1334700000000, 33.39],
            [1334786400000, 32.91],
            [1334872800000, 33.06],
            [1335132000000, 32.62],
            [1335218400000, 32.4],
            [1335304800000, 33.13],
            [1335391200000, 33.26],
            [1335477600000, 33.58],
            [1335736800000, 33.55],
            [1335823200000, 33.77],
            [1335909600000, 33.76],
            [1335996000000, 33.32],
            [1336082400000, 32.61],
            [1336341600000, 32.52],
            [1336428000000, 32.67],
            [1336514400000, 32.52],
            [1336600800000, 31.92],
            [1336687200000, 32.2],
            [1336946400000, 32.23],
            [1337032800000, 32.33],
            [1337119200000, 32.36],
            [1337205600000, 32.01],
            [1337292000000, 31.31],
            [1337551200000, 32.01],
            [1337637600000, 32.01],
            [1337724000000, 32.18],
            [1337810400000, 31.54],
            [1337896800000, 31.6],
            [1338242400000, 32.05],
            [1338328800000, 31.29],
            [1338415200000, 31.05],
            [1338501600000, 29.82],
            [1338760800000, 30.31],
            [1338847200000, 30.7],
            [1338933600000, 31.69],
            [1339020000000, 31.32],
            [1339106400000, 31.65],
            [1339365600000, 31.13],
            [1339452000000, 31.77],
            [1339538400000, 31.79],
            [1339624800000, 31.67],
            [1339711200000, 32.39],
            [1339970400000, 32.63],
            [1340056800000, 32.89],
            [1340143200000, 31.99],
            [1340229600000, 31.23],
            [1340316000000, 31.57],
            [1340575200000, 30.84],
            [1340661600000, 31.07],
            [1340748000000, 31.41],
            [1340834400000, 31.17],
            [1340920800000, 32.37],
            [1341180000000, 32.19],
            [1341266400000, 32.51],
            [1341439200000, 32.53],
            [1341525600000, 31.37],
            [1341784800000, 30.43],
            [1341871200000, 30.44],
            [1341957600000, 30.2],
            [1342044000000, 30.14],
            [1342130400000, 30.65],
            [1342389600000, 30.4],
            [1342476000000, 30.65],
            [1342562400000, 31.43],
            [1342648800000, 31.89],
            [1342735200000, 31.38],
            [1342994400000, 30.64],
            [1343080800000, 30.02],
            [1343167200000, 30.33],
            [1343253600000, 30.95],
            [1343340000000, 31.89],
            [1343599200000, 31.01],
            [1343685600000, 30.88],
            [1343772000000, 30.69],
            [1343858400000, 30.58],
            [1343944800000, 32.02],
            [1344204000000, 32.14],
            [1344290400000, 32.37],
            [1344376800000, 32.51],
            [1344463200000, 32.65],
            [1344549600000, 32.64],
            [1344808800000, 32.27],
            [1344895200000, 32.1],
            [1344981600000, 32.91],
            [1345068000000, 33.65],
            [1345154400000, 33.8],
            [1345413600000, 33.92],
            [1345500000000, 33.75],
            [1345586400000, 33.84],
            [1345672800000, 33.5],
            [1345759200000, 32.26],
            [1346018400000, 32.32],
            [1346104800000, 32.06],
            [1346191200000, 31.96],
            [1346277600000, 31.46],
            [1346364000000, 31.27],
            [1346709600000, 31.43],
            [1346796000000, 32.26],
            [1346882400000, 32.79],
            [1346968800000, 32.46],
            [1347228000000, 32.13],
            [1347314400000, 32.43],
            [1347400800000, 32.42],
            [1347487200000, 32.81]
          ]
        }
      ],
      chartOptions: {
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: "#999",
              label: {
                show: true,
                text: "Support",
                style: {
                  color: "#fff",
                  background: "#00E396"
                }
              }
            }
          ],
          xaxis: [
            {
              x: new Date("14 Nov 2012").getTime(),
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "Rally",
                style: {
                  color: "#fff",
                  background: "#775DD0"
                }
              }
            }
          ]
        },
        dataLabels: {
          enabled: false
        },

        markers: {
          size: 0,
          style: "hollow"
        },
        xaxis: {
          type: "datetime",
          min: new Date("01 Mar 2012").getTime(),
          tickAmount: 6
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        }
      }
    }
        
    },
    methods: {
        generateDayWiseTimeSeries: function (baseval, count, yrange) {
            var i = 0;
            var series = [];
            while (i < count) {
                var x = baseval;
                var y =
                    Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
                    yrange.min;

                series.push([x, y]);
                baseval += 86400000;
                i++;
            }
            return series;
        },
        updateData: function (timeline) {
            this.selection = timeline;

            switch (timeline) {
                case "one_month":
                    this.chartOptions = {
                        xaxis: {
                            min: new Date("28 Jan 2013").getTime(),
                            max: new Date("27 Feb 2013").getTime()
                        }
                    };
                    break;
                case "six_months":
                    this.chartOptions = {
                        xaxis: {
                            min: new Date("27 Sep 2012").getTime(),
                            max: new Date("27 Feb 2013").getTime()
                        }
                    };
                    break;
                case "one_year":
                    this.chartOptions = {
                        xaxis: {
                            min: new Date("27 Feb 2012").getTime(),
                            max: new Date("27 Feb 2013").getTime()
                        }
                    };
                    break;
                case "ytd":
                    this.chartOptions = {
                        xaxis: {
                            min: new Date("01 Jan 2013").getTime(),
                            max: new Date("27 Feb 2013").getTime()
                        }
                    };
                    break;
                case "all":
                    this.chartOptions = {
                        xaxis: {
                            min: undefined,
                            max: undefined
                        }
                    };
                    break;
                default:
            }
        }
    }
}
</script>

<style>

</style>
