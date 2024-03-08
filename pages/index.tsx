import React, { useState, useRef, useEffect } from "react";
import {
  FIgrDataChart, FIgrCategoryXAxis, FIgrNumericYAxis,
  FIgrLineSeries, FIgrSplineSeries, FIgrStepLineSeries,
  FIgrCrosshairLayer,
  FIgrDataLegend,
  FIgrDataToolTipLayer,
} from "../hooks/useDataChart";
import {
  CountryData
} from "../data/CountryData";
import { IgrDataChart , IgrCrosshairLayer, IgrLineSeries, IgrSplineSeries, IgrStepLineSeries } from "igniteui-react-charts";

// 凡例（DataLegend）の取得
// ツールチップレイヤーの取得
import { 
  IgrDataLegend,
} from 'igniteui-react-charts';

const DataChartNext = () => {
  const dummyData = new CountryData();

  // refを設定するための変数を定義
  const chartRef = useRef<IgrDataChart>(null);
  const crosshairLayerRef1 = useRef<IgrCrosshairLayer>(null);
  const lineSeriesRef = useRef<IgrLineSeries>(null);
  const splineSeriesRef = useRef<IgrSplineSeries>(null);
  const stepLineSeriesRef = useRef<IgrStepLineSeries>(null);
  const dataLegendRef = useRef<IgrDataLegend>(null);

  // Objectを定義
  const [chartObject, setChartObject] = useState<IgrDataChart | null>(null);
  const [dataLegendObject, setDataLegendObject] = useState<IgrDataLegend | null>(null);

  // 固定Y軸の値
  const [usValue, setUsValue] = useState(0);
  const [chValue, setChValue] = useState(0);
  const [ruValue, setRuValue] = useState(0);

  // チャートのrefを設定
  const onChartRef = (chart: IgrDataChart) => {
    setChartObject(chart);
    if (!chart) { return; }

    // 上下グラフの同期
    chart.syncChannel = "channelA";
    chart.synchronizeHorizontally = true; // 横軸の同期
    chart.synchronizeVertically = true; // 縦軸の同期

    //固定Y軸の描画
    chart.actualWindowRectChanged = (s, e) => {
      const x = e.newRect.left + e.newRect.width / 2;
      const y = e.newRect.top + e.newRect.height / 2;

      if(crosshairLayerRef1.current) {
        crosshairLayerRef1.current.cursorPosition = { x: x, y: y };
        setUsValue(lineSeriesRef.current?.getSeriesValue({ x: x, y: y }, true, true) || 0);
        setChValue(splineSeriesRef.current?.getSeriesValue({ x: x, y: y }, true, true) || 0);
        setRuValue(stepLineSeriesRef.current?.getSeriesValue({ x: x, y: y }, true, true) || 0);
      }
    };
  };

  // 固定Y軸の描画
  const onCrosshairLayerRef1 = (crosshairLayer: IgrCrosshairLayer) => {
    if (!crosshairLayer) { return; }
    crosshairLayerRef1.current = crosshairLayer;
    crosshairLayerRef1.current.cursorPosition = { x: 0.5, y: 0.5 };
  };

  // チャートのrefを設定
  const onLineSeriesRef = (lineSeries: IgrLineSeries) => {
    if (!lineSeries) { return; }
    lineSeriesRef.current = lineSeries;
  };
  const onSplineSeriesRef = (splineSeries: IgrSplineSeries) => {
    if (!splineSeries) { return; }
    splineSeriesRef.current = splineSeries;
  };
  const onStepLineSeriesRef = (stepLineSeries: IgrStepLineSeries) => {
    if (!stepLineSeries) { return; }
    stepLineSeriesRef.current = stepLineSeries;
  };

  // 凡例（DataLegend）のrefを設定
  const onDataLegendRef = (legend: IgrDataLegend) => {
    setDataLegendObject(legend);
    if (!legend) { return; }
    dataLegendRef.current = legend;
    dataLegendRef.current.setState({});
  };

  return (
    <div>

        <div>
          {/* 凡例（DataLegend）の表示 */}
          <div className="legend" style={{ textAlign: "left" }}>
            <FIgrDataLegend
                ref={onDataLegendRef}
                target={chartObject}>
            </FIgrDataLegend>
          </div>

          {/* チャート（下） */}
          <FIgrDataChart
            ref={onChartRef}
            width="800px"
            height="500px"
            dataSource={dummyData}
            isHorizontalZoomEnabled={true}
            isVerticalZoomEnabled={true}
            leftMargin={0}
            rightMargin={0}
            defaultInteraction="dragPan"
            highlightingMode={0}
          >

            {/* ツールチップレイヤーの表示 */}
            <FIgrDataToolTipLayer 
              name="myDataTooltip"
              groupingMode="Individual" // Individual, グループ：grouped
              groupedPositionModeX="pinRight"
              groupedPositionModeY="pinTop">
            </FIgrDataToolTipLayer>

            {/* X軸・Y軸 */}
            <FIgrCategoryXAxis name="xAxis" label="X" />

            {/* ラベルロケーションの追記 */}
            <FIgrNumericYAxis 
              name="yAxis" 
              labelVisibility={0} // 1:非表示, 0:表示
              labelLocation="InsideLeft"/>

            {/* ラインチャート（折れ線） */}
            <FIgrLineSeries
              ref={onLineSeriesRef}
              name="series1"
              title="USA"
              showDefaultTooltip="true"
              valueMemberPath="USA"
              xAxisName="xAxis"
              yAxisName="yAxis"
            />
            {/* スプラインチャート（なめらかな曲線） */}
            <FIgrSplineSeries
              ref={onSplineSeriesRef}
              name="series2"
              title="China"
              showDefaultTooltip="true"
              valueMemberPath="China"
              xAxisName="xAxis"
              yAxisName="yAxis"
            />
            {/* ステップラインチャート */}
            <FIgrStepLineSeries
              ref={onStepLineSeriesRef}
              name="series3"
              title="Russia"
              showDefaultTooltip="true"
              valueMemberPath="Russia"
              xAxisName="xAxis"
              yAxisName="yAxis"
            />

            {/* 固定Y軸*/}
            <FIgrCrosshairLayer
              ref={onCrosshairLayerRef1}
              name="CrosshairLayer1"
              brush="Black"
              horizontalLineVisibility="Collapsed"
              showDefaultTooltip="true"
            />
          </FIgrDataChart>
        </div>

    </div>
  );
};

export default DataChartNext;
