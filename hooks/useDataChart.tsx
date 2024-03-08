import dynamic from "next/dynamic";
import React, { LegacyRef, forwardRef, PropsWithChildren } from "react";
import { 
  IgrDataChart, IIgrDataChartProps,
  IgrNumericYAxis, IIgrNumericYAxisProps,
  IgrNumericXAxis, IIgrNumericXAxisProps, 
  IgrCategoryXAxis, IIgrCategoryXAxisProps, 
  IgrLineSeries, IIgrLineSeriesProps, 
  IgrSplineSeries, IIgrSplineSeriesProps, 
  IgrStepLineSeries, IIgrStepLineSeriesProps,
  IgrCrosshairLayer, IIgrCrosshairLayerProps,
  IgrDataLegend, IIgrDataLegendProps,
  IgrDataToolTipLayer, IIgrDataToolTipLayerProps,
} from "igniteui-react-charts";

// refを設定するためのインターフェースを定義
interface IIgnDataChartProps extends IIgrDataChartProps {
  dataChartRef: LegacyRef<IgrDataChart>;
}
interface IIgnCategoryXAxisProps extends IIgrCategoryXAxisProps {
  categoryXAxisRef: LegacyRef<IgrCategoryXAxis>;
}
interface IIgnNumericXAxisProps extends IIgrNumericXAxisProps {
  numericXAxisRef: LegacyRef<IgrNumericXAxis>;
}
interface IIgnNumericYAxisProps extends IIgrNumericYAxisProps {
  numericYAxisRef: LegacyRef<IgrNumericYAxis>;
}
interface IIgnLineSeriesProps extends IIgrLineSeriesProps {
  lineSeriesRef: LegacyRef<IgrLineSeries>;
}
interface IIgnSplineSeriesProps extends IIgrSplineSeriesProps {
  splineSeriesRef: LegacyRef<IgrSplineSeries>;
}
interface IIgnStepLineSeriesProps extends IIgrStepLineSeriesProps {
  stepLineSeriesRef: LegacyRef<IgrStepLineSeries>;
}
interface IIgnCrosshairLayerProps extends IIgrCrosshairLayerProps {
  crosshairLayerRef: LegacyRef<IgrCrosshairLayer>;
}
interface IIgnDataLegendProps extends IIgrDataLegendProps {
  dataLegendRef: LegacyRef<IgrDataLegend>;
}
interface IIgnDataToolTipLayerProps extends IIgrDataToolTipLayerProps {
  dataToolTipLayerRef: LegacyRef<IgrDataToolTipLayer>;
}

// forwardRefを使ってrefを設定するためのコンポーネントを作成
export const FIgrDataChart = forwardRef<any, PropsWithChildren<IIgrDataChartProps>>((props, ref) => {
  return <IgnDataChart dataChartRef={ref} {...props}>{props.children}</IgnDataChart>
});
export const FIgrCategoryXAxis = forwardRef<any, IIgrCategoryXAxisProps>((props, ref) => {
  return <IgnCategoryXAxis categoryXAxisRef={ref} {...props}></IgnCategoryXAxis>
});
export const FIgrNumericXAxis = forwardRef<any, IIgrNumericXAxisProps>((props, ref) => {
  return <IgnNumericXAxis numericXAxisRef={ref} {...props}></IgnNumericXAxis>
});
export const FIgrNumericYAxis = forwardRef<any, IIgrNumericYAxisProps>((props, ref) => {
  return <IgnNumericYAxis numericYAxisRef={ref} {...props}></IgnNumericYAxis>
});
export const FIgrLineSeries = forwardRef<any, IIgrLineSeriesProps>((props, ref) => {
  return <IgnLineSeries lineSeriesRef={ref} {...props}></IgnLineSeries>
});
export const FIgrSplineSeries = forwardRef<any, IIgrSplineSeriesProps>((props, ref) => {
  return <IgnSplineSeries splineSeriesRef={ref} {...props}></IgnSplineSeries>
});
export const FIgrStepLineSeries = forwardRef<any, IIgrStepLineSeriesProps>((props, ref) => {
  return <IgnStepLineSeries stepLineSeriesRef={ref} {...props}></IgnStepLineSeries>
});
export const FIgrCrosshairLayer = forwardRef<any, IIgrCrosshairLayerProps>((props, ref) => {
  return <IgnCrosshairLayer crosshairLayerRef={ref} {...props}></IgnCrosshairLayer>
});
export const FIgrDataLegend = forwardRef<any, IIgrDataLegendProps>((props, ref) => {
  return <IgnDataLegend dataLegendRef={ref} {...props}></IgnDataLegend>
});
export const FIgrDataToolTipLayer = forwardRef<any, IIgrDataToolTipLayerProps>((props, ref) => {
  return <IgnDataToolTipLayer dataToolTipLayerRef={ref} {...props}></IgnDataToolTipLayer>
});

// DataChart ダイナミックインポート
export const IgnDataChart = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { 
      IgrDataChart,
      IgrDataChartCoreModule,
      IgrDataChartInteractivityModule, 
      IgrDataChartVerticalCategoryModule,
      IgrDataChartScatterCoreModule,
      IgrDataChartScatterModule,
      IgrDataChartCategoryModule, // Add for Tooltip
      IgrNumberAbbreviatorModule, // Add for Tooltip
     } = await import(
      "igniteui-react-charts"
    );

    IgrDataChartCoreModule.register();
    IgrDataChartInteractivityModule.register();
    IgrDataChartVerticalCategoryModule.register();
    IgrDataChartScatterCoreModule.register();
    IgrDataChartScatterModule.register();
    IgrDataChartCategoryModule.register(); // Add for Tooltip
    IgrNumberAbbreviatorModule.register(); // Add for Tooltip

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrDataChartComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnDataChartComponent = ({
      dataChartRef,
      ...props
    }: IIgnDataChartProps) => {
      return <IgrDataChart ref={dataChartRef} {...props}></IgrDataChart>;
    };

    return IgnDataChartComponent;
  },
  { ssr: false }
);

// カテゴリX軸 ダイナミックインポート
export const IgnCategoryXAxis = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { 
      IgrCategoryXAxis,
      IgrDataChartCategoryModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrDataChartCategoryModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrCategoryXAxisComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnCategoryXAxisComponent = ({
      categoryXAxisRef,
      ...props
    }: IIgnCategoryXAxisProps) => {
      return <IgrCategoryXAxis ref={categoryXAxisRef} {...props}></IgrCategoryXAxis>;
    };

    return IgnCategoryXAxisComponent;
  },
  { ssr: false }
);

// 数値X軸 ダイナミックインポート
export const IgnNumericXAxis = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { 
      IgrNumericXAxis,
      IgrDataChartCategoryModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrDataChartCategoryModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrNumericXAxisComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnNumericXAxisComponent = ({
      numericXAxisRef,
      ...props
    }: IIgnNumericXAxisProps) => {
      return <IgrNumericXAxis ref={numericXAxisRef} {...props}></IgrNumericXAxis>;
    };

    return IgnNumericXAxisComponent;
  },
  { ssr: false }
);

// 数値Y軸 ダイナミックインポート
export const IgnNumericYAxis = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { 
      IgrNumericYAxis,
      IgrDataChartCategoryModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrDataChartCategoryModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrNumericYAxisComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnNumericYAxisComponent = ({
      numericYAxisRef,
      ...props
    }: IIgnNumericYAxisProps) => {
      return <IgrNumericYAxis ref={numericYAxisRef} {...props}></IgrNumericYAxis>;
    };

    return IgnNumericYAxisComponent;
  },
  { ssr: false }
);

// 折れ線グラフ ダイナミックインポート
export const IgnLineSeries = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { 
      IgrLineSeries,
      IgrLineSeriesModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrLineSeriesModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrLineSeriesComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnLineSeriesComponent = ({
      lineSeriesRef,
      ...props
    }: IIgnLineSeriesProps) => {
      return <IgrLineSeries ref={lineSeriesRef} {...props}></IgrLineSeries>;
    };

    return IgnLineSeriesComponent;
  },
  { ssr: false }
);

// スプライングラフ ダイナミックインポート
export const IgnSplineSeries = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { 
      IgrSplineSeries,
      IgrSplineSeriesModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrSplineSeriesModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrSplineSeriesComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnSplineSeriesComponent = ({
      splineSeriesRef,
      ...props
    }: IIgnSplineSeriesProps) => {
      return <IgrSplineSeries ref={splineSeriesRef} {...props}></IgrSplineSeries>;
    };

    return IgnSplineSeriesComponent;
  },
  { ssr: false }
);

// ステップ折れ線グラフ ダイナミックインポート
export const IgnStepLineSeries = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { 
      IgrStepLineSeries,
      IgrStepLineSeriesModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrStepLineSeriesModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrStepLineSeriesComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnStepLineSeriesComponent = ({
      stepLineSeriesRef,
      ...props
    }: IIgnStepLineSeriesProps) => {
      return <IgrStepLineSeries ref={stepLineSeriesRef} {...props}></IgrStepLineSeries>;
    };

    return IgnStepLineSeriesComponent;
  },
  { ssr: false }
);

// 固定Y軸の描画 ダイナミックインポート
export const IgnCrosshairLayer = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {
      IgrCrosshairLayer,
      IgrCrosshairLayerModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrCrosshairLayerModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrCrosshairLayerComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnCrosshairLayerComponent = ({
      crosshairLayerRef,
      ...props
    }: IIgnCrosshairLayerProps) => {
      return <IgrCrosshairLayer ref={crosshairLayerRef} {...props}></IgrCrosshairLayer>;
    };

    return IgnCrosshairLayerComponent;
  },
  { ssr: false }
);

// 凡例 ダイナミックインポート
export const IgnDataLegend = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {
      IgrDataLegend,
      IgrDataLegendModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrDataLegendModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrDataLegendComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnDataLegendComponent = ({
      dataLegendRef,
      ...props
    }: IIgnDataLegendProps) => {
      return <IgrDataLegend ref={dataLegendRef} {...props}></IgrDataLegend>;
    };

    return IgnDataLegendComponent;
  },
  { ssr: false }
);

// ツールチップ ダイナミックインポート
export const IgnDataToolTipLayer = dynamic(
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {
      IgrDataToolTipLayer,
      IgrDataChartCategoryModule,
     } = await import(
      "igniteui-react-charts"
    );

    IgrDataChartCategoryModule.register();

    // ダイナミックインポートが完了したことを確認するためのログ
    console.log("IgrDataToolTipLayerComponent dynamically imported.");

    // refを設定するために新しく表示用のコンポーネントを作成
    const IgnDataToolTipLayerComponent = ({
      dataToolTipLayerRef,
      ...props
    }: IIgnDataToolTipLayerProps) => {
      return <IgrDataToolTipLayer ref={dataToolTipLayerRef} {...props}></IgrDataToolTipLayer>;
    };

    return IgnDataToolTipLayerComponent;
  },
  { ssr: false }
);
