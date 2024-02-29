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
  IgrDataToolTipLayer 
} from 'igniteui-react-charts';

const DataChartNext = () => {
  const dummyData = new CountryData();

  // refを設定するための変数を定義
  const chartRef = useRef<IgrDataChart>(null);
  const crosshairLayerRef1 = useRef<IgrCrosshairLayer>(null);
  const lineSeriesRef = useRef<IgrLineSeries>(null);
  const splineSeriesRef = useRef<IgrSplineSeries>(null);
  const stepLineSeriesRef = useRef<IgrStepLineSeries>(null);
  const overlayRef = useRef(null);
  const dataLegendRef = useRef<IgrDataLegend>(null);

  // Objectを定義
  const [chartObject, setChartObject] = useState<IgrDataChart | null>(null);
  const [dataLegendObject, setDataLegendObject] = useState<IgrDataLegend | null>(null);

  // 固定Y軸の値
  const [usValue, setUsValue] = useState(0);
  const [chValue, setChValue] = useState(0);
  const [ruValue, setRuValue] = useState(0);

  // ハイライトモード (Auto, Brighten, BrightenOthers, Fade, FadeOthers, None)
  const [highlightingMode, setHighlightingMode] = useState("FadeOthers");

  // ツールチップモード (individual, grouped)
  const [tooltipMode, setTooltipMode] = useState("Individual");

  // 描画している線の太さ
  const [lineThicknessUSA, setLineThicknessUSA] = useState(2);
  const [lineThicknessChina, setLineThicknessChina] = useState(2);
  const [lineThicknessRussia, setLineThicknessRussia] = useState(2);

  // ラベルロケーション表示・非表示のステータス
  const [labelLocationMode, setLabelLocationMode] = useState(0);

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

  // ハイライトモードの変更
  const onHighlightingModeChanged = (newMode: string) => {
    setHighlightingMode(newMode);
    if (chartRef.current && crosshairLayerRef1.current) {
      const strokeColor = newMode === "None" ? "Transparent" : "Black";
      crosshairLayerRef1.current.outline = strokeColor;
    }
  };

  // 線の太さの変更
  const onLineThicknessChanged = (country: number) => {
    switch (country) {
      case 1:
        if (lineSeriesRef.current.thickness === 5) {
          setLineThicknessUSA(2);
        }else{
          setLineThicknessUSA(5);
        }
        setLineThicknessChina(2);
        setLineThicknessRussia(2);
        break;
      case 2:
        if (splineSeriesRef.current.thickness === 5) {
          setLineThicknessChina(2);
        }else{
          setLineThicknessChina(5);
        }
        setLineThicknessUSA(2);
        setLineThicknessRussia(2);
        break;
      case 3:
        if (stepLineSeriesRef.current.thickness === 5) {
          setLineThicknessRussia(2);
        }else{
          setLineThicknessRussia(5);
        }
        setLineThicknessUSA(2);
        setLineThicknessChina(2);
        break;
    }
  };

  // ハイライトモードの変更に伴う処理
  useEffect(() => {
    if (chartRef.current && crosshairLayerRef1.current) {
      const strokeColor = highlightingMode === "None" ? "Transparent" : "Black";
      crosshairLayerRef1.current.outline = strokeColor;
    }
  }, [highlightingMode]);

  // ラベルロケーション表示切り替えボタンの処理
  const onLabelLocationButtonClick = () => {
    if (labelLocationMode === 1) {
        setLabelLocationMode(0);
    }
    else {
        setLabelLocationMode(1);
    }
  };

  // ツールチップ切り替えボタンの処理
  const onTooltipButtonClick = () => {
    if (tooltipMode === "Individual") {
        setTooltipMode("grouped");
    }
    else {
        setTooltipMode("Individual");
    }
  };

  return (
    <div>

        <div>
          {/* オーバーレイ用のコンテナ */}
          <div ref={overlayRef} style={{ position: "relative" }} />

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
            highlightingMode={highlightingMode}
          >

            {/* ツールチップレイヤーの表示 */}
            <FIgrDataToolTipLayer 
              name="myDataTooltip"
              groupingMode={tooltipMode} // Individual, グループ：grouped
              groupedPositionModeX="pinRight"
              groupedPositionModeY="pinTop">
            </FIgrDataToolTipLayer>

            {/* X軸・Y軸 */}
            <FIgrCategoryXAxis name="xAxis" label="X" />

            {/* ラベルロケーションの追記 */}
            <FIgrNumericYAxis 
              name="yAxis" 
              labelVisibility={labelLocationMode} // 1:非表示, 0:表示
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
              thickness={lineThicknessUSA}
            />
            {/* スプラインチャート（なめらかな曲線） */}
            <FIgrSplineSeries
              ref={onSplineSeriesRef}
              name="series2"
              title="China"
              showDefaultTooltip="true"
              valueMemberPath="China"
              thickness={lineThicknessChina}
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
              thickness={lineThicknessRussia}
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "10px" }}>
        {/* ハイライトモード変更用のボタン */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "10em", fontWeight: "bold", marginRight: "1em" }}>ハイライトモード</div>
          <div style={{ display: "flex" }}>
            <button onClick={() => onHighlightingModeChanged("FadeOthers")}>FadeOthers</button>
            <div style={{ width: "1em" }} /> {/* 間隔用のディバイダー */}
            <button onClick={() => onHighlightingModeChanged("Brighten")}>Brighten</button>
          </div>
        </div>

        {/* 線の太さ変更用のボタン */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <div style={{ width: "10em", fontWeight: "bold", marginRight: "1em" }}>ラインの強調</div>
          <div style={{ display: "flex" }}>
            <button onClick={() => onLineThicknessChanged(1)}>USA</button>
            <div style={{ width: "1em" }} /> {/* 間隔用のディバイダー */}
            <button onClick={() => onLineThicknessChanged(2)}>China</button>
            <div style={{ width: "1em" }} /> {/* 間隔用のディバイダー */}
            <button onClick={() => onLineThicknessChanged(3)}>Russia</button>
          </div>
        </div>

        {/* ラベルロケーション表示切り替えボタン */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <div style={{ width: "10em", fontWeight: "bold", marginRight: "1em" }}>左ラベル表示・非表示</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
              <button onClick={onLabelLocationButtonClick}>LabelLocation</button>
            </div>
        </div>

        {/* ツールチップ切り替えボタン */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <div style={{ width: "10em", fontWeight: "bold", marginRight: "1em" }}>ツールチップ切り替え</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
              <button onClick={onTooltipButtonClick}>Tooltip</button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DataChartNext;
