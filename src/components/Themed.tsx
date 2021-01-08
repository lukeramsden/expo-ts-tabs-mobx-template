import Colors from "@constants/Colors";
import { Ionicons as DefaultIcon } from "@expo/vector-icons";
import {
  Icon as IconInterface,
  IconProps as DefaultIconProps,
} from "@expo/vector-icons/build/createIconSet";
import useColorScheme from "@hooks/useColorScheme";
import produce from "immer";
import * as React from "react";
import {
  Button as DefaultButton,
  Text as DefaultText,
  View as DefaultView,
} from "react-native";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function useThemeColors<
  T extends keyof typeof Colors.light &
    keyof typeof Colors.dark = keyof typeof Colors.light &
    keyof typeof Colors.dark
>(colorNames?: T[]): Record<T, string> {
  const theme = useColorScheme();

  if (colorNames) {
    return produce({} as ReturnType<typeof useThemeColors>, (draft) => {
      colorNames.map((colorName) => {
        draft[colorName] = Colors[theme][colorName];
      });
    });
  }

  return { ...Colors[theme] };
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  themeColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export type TextProps = ThemeProps & DefaultText["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export type ViewProps = ThemeProps & DefaultView["props"];
export function View(props: ViewProps) {
  const {
    style,
    lightColor = "transparent",
    darkColor = "transparent",
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export type LayoutProps = ThemeProps & DefaultView["props"];
export function Layout(props: LayoutProps) {
  const {
    style,
    lightColor,
    darkColor,
    themeColor = "background",
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    themeColor
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export type IconProps = ThemeProps &
  DefaultIconProps<string> & {
    /** @default Ionicons */
    component?: IconInterface<string, string>;
  };
export function Icon(props: IconProps) {
  const {
    lightColor,
    darkColor,
    themeColor = "text",
    component: Component = DefaultIcon,
    name,
    ...otherProps
  } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    themeColor
  );

  return <Component color={color} name={name as any} {...otherProps} />;
}

export type ButtonProps = ThemeProps & DefaultButton["props"];
export function Button(props: ButtonProps) {
  const {
    lightColor,
    darkColor,
    themeColor = "buttonColor",
    ...otherProps
  } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    props.disabled ? "buttonColorDisabled" : themeColor
  );

  return <DefaultButton color={color} {...otherProps} />;
}
