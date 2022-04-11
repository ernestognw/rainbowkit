/* eslint-disable sort-keys-fix/sort-keys-fix */
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { hideFocusRingsDataAttribute } from 'css/reset.css';
import { Sprinkles } from 'css/sprinkles.css';
import { atoms } from '../../css/atoms';
import { vars } from '../../css/vars.css';

const size = {
  xs: atoms({
    fontSize: '1',
    height: '7',
    paddingX: '3',
    gap: '1',
  }),
  s: atoms({
    fontSize: '2',
    height: '8',
    paddingX: '4',
    gap: '2',
  }),
  m: atoms({
    fontSize: '2',
    height: '9',
    paddingX: '4',
    gap: '2',
  }),
  l: style([
    atoms({
      fontSize: '3',
      paddingX: '5',
      gap: '2',
    }),
    style({ height: '36px' }),
  ]),
  xl: style([
    atoms({
      fontSize: '3',
      paddingX: '7',
      gap: '3',
    }),
    style({ height: '44px' }),
  ]),
};

export type Size = keyof typeof size;

const outlineValue = `inset 0 0 0 2px ${vars.colors.blue}`;

const variant = {
  contrast: style([
    atoms({
      backgroundColor: 'fillElevated',
      color: 'label',
    }),
  ]),
  gray: style([
    atoms({
      backgroundColor: 'fillSecondary',
      color: 'label',
    }),
  ]),
  blue: style([
    atoms({ color: 'blue' }),
    style({ backgroundColor: 'rgba(14, 118, 253, 0.08)' }),
  ]),
  outline: style([
    atoms({ color: 'label' }),
    style({
      backgroundColor: 'transparent',
      boxShadow: outlineValue,
      selectors: {
        [hideFocusRingsDataAttribute]: {
          boxShadow: outlineValue,
        },
      },
    }),
  ]),
  ghost: style([
    atoms({ color: 'label' }),
    style({
      backgroundColor: 'transparent',
    }),
  ]),
  purpleGradient: style([
    atoms({ color: 'white100' }),
    style({
      backgroundImage: `linear-gradient(to right, ${vars.colors.blue50}, ${vars.colors.purple50})`,
    }),
  ]),
  blueGradient: style([
    atoms({ color: 'white100' }),
    style({
      backgroundImage: `linear-gradient(270deg, #1DA1F2, #1D7DF2)`,
    }),
  ]),
  pinkGradient: style([
    atoms({ color: 'white100' }),
    style({
      backgroundImage: `linear-gradient(270deg, ${vars.colors.red50}, ${vars.colors.pink60})`,
    }),
  ]),
};

export type Variant = keyof typeof variant;

const shape = {
  circle: {},
};

export type Shape = keyof typeof shape;

const shadowValue =
  '0 10px 30px rgba(27, 29, 31, 0.1), 0 5px 15px rgba(27, 29, 31, 0.04)';

const shadow = {
  true: style({
    boxShadow: shadowValue,
    selectors: {
      [hideFocusRingsDataAttribute]: {
        boxShadow: shadowValue,
      },
    },
  }),
  false: {},
};

export type Shadow = keyof typeof shadow;

const getShapeSizeCompoundVariant = (
  size: Size,
  width: Sprinkles['size'] | number
) => ({
  variants: {
    size,
    shape: 'circle' as const,
  },
  style: [
    atoms({
      width: typeof width === 'string' ? (width as any) : undefined,
      textAlign: 'center',
      justifyContent: 'center',
    }),
    style({
      width: Number(width) && (width as any),
      paddingLeft: '0',
      paddingRight: '0',
    }),
  ],
});

export const variants = recipe({
  base: style([
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'inline-flex',
      borderRadius: 'round',
      fontFamily: 'normal',
      transitionProperty: 'transform',
      transitionTimingFunction: 'ease',
      transitionDuration: '100',
      transform: {
        hover: 'grow',
        active: 'shrink',
      },
    }),
    style({
      willChange: 'transform',
      fontWeight: 600,
      lineHeight: 1,
      selectors: {
        '&:focus': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${vars.colors.background}, 0 0 0 4px ${vars.colors.purple}`,
        },
        '&:disabled': {
          backgroundColor: vars.colors.fill,
          color: vars.colors.gray30,
          boxShadow: 'none',
          cursor: 'not-allowed',
        },
      },
    }),
  ]),
  variants: {
    size,
    variant,
    shape,
    shadow,
  },
  compoundVariants: [
    getShapeSizeCompoundVariant('xs', '7'),
    getShapeSizeCompoundVariant('s', '8'),
    getShapeSizeCompoundVariant('m', '9'),
    getShapeSizeCompoundVariant('l', 36),
    getShapeSizeCompoundVariant('xl', 44),
    {
      variants: {
        variant: 'outline',
        shadow: true,
      },
      style: {
        boxShadow: `${outlineValue}, ${shadowValue}`,
        selectors: {
          [hideFocusRingsDataAttribute]: {
            boxShadow: `${outlineValue}, ${shadowValue}`,
          },
        },
      },
    },
  ],
});

export type Variants = RecipeVariants<typeof variants>;