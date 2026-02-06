/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {themes, type PrismTheme} from 'prism-react-renderer';

const baseTheme = themes.vsDark;

export default {
  plain: {
    color: '#E6F5FF',
    backgroundColor: '#0B1420',
  },
  styles: [
    ...baseTheme.styles,
    {
      types: ['title'],
      style: {
        color: '#36DBF8',
        fontWeight: 'bold',
      },
    },
    {
      types: ['property', 'parameter'],
      style: {
        color: '#7EE7FF',
      },
    },
    {
      types: ['script'],
      style: {
        color: '#E6F5FF',
      },
    },
    {
      types: ['boolean', 'arrow', 'atrule', 'tag'],
      style: {
        color: '#36DBF8',
      },
    },
    {
      types: ['number', 'color', 'unit'],
      style: {
        color: '#8CE9C8',
      },
    },
    {
      types: ['font-matter'],
      style: {
        color: '#FFC4A1',
      },
    },
    {
      types: ['keyword', 'rule'],
      style: {
        color: '#9AD7FF',
      },
    },
    {
      types: ['regex'],
      style: {
        color: '#FF9FB2',
      },
    },
    {
      types: ['maybe-class-name'],
      style: {
        color: '#6FE6D4',
      },
    },
    {
      types: ['constant'],
      style: {
        color: '#5BE3FA',
      },
    },
  ],
} satisfies PrismTheme;
