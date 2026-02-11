
# Transform Matrix Guide
Comprehensive guide on using 3x3 transformation matrices for 2D graphics transformations in Novadesk.

Transformation matrices are fundamental mathematical tools used to apply geometric transformations to 2D elements in Novadesk. This guide explains how transformation matrices work and provides practical examples for common transformations.

## Understanding Transformation Matrices

A transformation matrix is a 3×3 matrix that can represent various 2D transformations including translation, rotation, scaling, and shearing. In Novadesk, these matrices are used to manipulate the position, size, and orientation of visual elements.

The general form of a 3×3 transformation matrix is:

```
[a  b  tx]
[c  d  ty]
[0  0  1 ]
```

Where:
- **a, d**: Control scaling and rotation
- **b, c**: Control shearing
- **tx, ty**: Control translation (position offset)
- The bottom row [0, 0, 1] maintains mathematical consistency

## Matrix Representation in Code

In Novadesk, transformation matrices are represented as flat arrays of 6 numbers (the essential elements):

```javascript
transformMatrix: [a, b, c, d, tx, ty]
```

This corresponds to:
```javascript
[
  a,  b,  // First row: scaling/rotation/shearing for X
  c,  d,  // Second row: scaling/rotation/shearing for Y
  tx, ty  // Third row: translation (X, Y offsets)
]
```

## Common Transformations

### Identity Matrix
The identity matrix applies no transformation - it leaves elements unchanged.

```javascript
// Identity matrix - no transformation
transformMatrix: [1, 0, 0, 1, 0, 0]
```

This represents:
```
[1  0  0]
[0  1  0]
[0  0  1]
```

### Translation
Moves an element by specified X and Y distances.

```javascript
// Move 50 pixels right, 30 pixels down
transformMatrix: [1, 0, 0, 1, 50, 30]
```

Mathematical representation:
```
[1  0  50]
[0  1  30]
[0  0  1 ]
```

### Scaling
Changes the size of an element. Values greater than 1 enlarge, values between 0 and 1 shrink.

```javascript
// Scale 2x in both directions (double size)
transformMatrix: [2, 0, 0, 2, 0, 0]

// Scale 0.5x horizontally, 1.5x vertically
transformMatrix: [0.5, 0, 0, 1.5, 0, 0]
```

Uniform scaling (same in both directions):
```
[s  0  0]
[0  s  0]
[0  0  1]
```

Non-uniform scaling:
```
[sx  0   0]
[0   sy  0]
[0   0   1]
```

### Rotation
Rotates an element around its origin by a specified angle (in radians).

```javascript
// Rotate 45 degrees clockwise (π/4 radians)
const angle = Math.PI / 4;
transformMatrix: [
  Math.cos(angle),  Math.sin(angle),
  -Math.sin(angle), Math.cos(angle),
  0, 0
]

// Rotate 90 degrees counter-clockwise (π/2 radians)
const angle90 = Math.PI / 2;
transformMatrix: [
  Math.cos(angle90),  Math.sin(angle90),
  -Math.sin(angle90), Math.cos(angle90),
  0, 0
]
```

Rotation matrix:
```
[cos(θ)  -sin(θ)  0]
[sin(θ)   cos(θ)  0]
[0        0       1]
```

### Shearing
Slants elements along X or Y axes.

```javascript
// Shear along X-axis (horizontal slant)
transformMatrix: [1, 0.5, 0, 1, 0, 0]

// Shear along Y-axis (vertical slant)
transformMatrix: [1, 0, 0.5, 1, 0, 0]
```

X-shear matrix:
```
[1  shx  0]
[0  1    0]
[0  0    1]
```

Y-shear matrix:
```
[1   0   0]
[shy 1   0]
[0   0   1]
```

## Combining Transformations

Transformations can be combined by multiplying matrices. The order matters - transformations are applied right-to-left.

### Scale then Rotate
```javascript
// Scale by 2, then rotate 45°
const scale = [2, 0, 0, 2, 0, 0];
const angle = Math.PI / 4;
const rotate = [
  Math.cos(angle),  Math.sin(angle),
  -Math.sin(angle), Math.cos(angle),
  0, 0
];

// Combined matrix (rotate * scale)
transformMatrix: [
  2 * Math.cos(angle),  2 * Math.sin(angle),
  -2 * Math.sin(angle), 2 * Math.cos(angle),
  0, 0
]
```

### Translate then Scale
```javascript
// Move to (100, 50), then scale by 1.5
transformMatrix: [1.5, 0, 0, 1.5, 100, 50]
```

### Complex Combination
```javascript
// Scale, rotate, then translate
const scale = 1.2;
const angle = Math.PI / 6; // 30°
const translateX = 80;
const translateY = 40;

transformMatrix: [
  scale * Math.cos(angle),  scale * Math.sin(angle),
  -scale * Math.sin(angle), scale * Math.cos(angle),
  translateX, translateY
]
```

## Practical Examples

### Center Rotation
To rotate around the center of an element rather than its top-left corner:

```javascript
// Assuming element width = 200, height = 100
const centerX = 100;
const centerY = 50;
const angle = Math.PI / 3; // 60°

// Translate to center, rotate, translate back
transformMatrix: [
  Math.cos(angle),  Math.sin(angle),
  -Math.sin(angle), Math.cos(angle),
  centerX - centerX * Math.cos(angle) + centerY * Math.sin(angle),
  centerY - centerX * Math.sin(angle) - centerY * Math.cos(angle)
]
```

### Flip Horizontally
```javascript
// Mirror horizontally through the Y-axis
transformMatrix: [-1, 0, 0, 1, 0, 0]
```

### Flip Vertically
```javascript
// Mirror vertically through the X-axis
transformMatrix: [1, 0, 0, -1, 0, 0]
```

### Skew Effect
```javascript
// Create a skew/slant effect
transformMatrix: [1, 0.3, 0.2, 1, 0, 0]
```

## Mathematical Details

### Matrix Multiplication
When combining transformations, matrices are multiplied:

If Matrix A = [a₁ b₁ c₁ d₁ tx₁ ty₁] and Matrix B = [a₂ b₂ c₂ d₂ tx₂ ty₂], then A × B =

```
[a₁a₂+b₁c₂  a₁b₂+b₁d₂  a₁tx₂+b₁ty₂+tx₁]
[c₁a₂+d₁c₂  c₁b₂+d₁d₂  c₁tx₂+d₁ty₂+ty₁]
[0          0          1                ]
```

### Coordinate Transformation
Given a point (x, y), the transformed coordinates (x', y') are calculated as:

```
x' = a×x + c×y + tx
y' = b×x + d×y + ty
```

### Determinant and Inverse
The determinant of a transformation matrix tells us about scaling:
- det = a×d - b×c
- If det > 1: net expansion
- If 0 < det < 1: net contraction
- If det < 0: includes reflection

The inverse matrix undoes the transformation:
```
inv = (1/det) × [d  -b  b×ty-d×tx]
                 [-c  a  c×tx-a×ty]
                 [0   0  det      ]
```

## Best Practices

1. **Order Matters**: Apply transformations in the correct sequence (usually scale → rotate → translate)
2. **Performance**: Pre-calculate combined matrices rather than applying multiple separate transforms
3. **Precision**: Use floating-point arithmetic for smooth animations
4. **Bounds Checking**: Consider how transformations affect element boundaries
5. **Anchor Points**: Remember that rotations and scales happen around the element's origin (top-left by default)

## Common Pitfalls

- **Cumulative Transforms**: Applying the same transform repeatedly compounds the effect
- **Floating Point Errors**: Repeated calculations may accumulate small errors
- **Coordinate System**: Remember Novadesk uses screen coordinates (Y increases downward)
- **Matrix Singularity**: Avoid matrices with determinant = 0 (non-invertible)

Understanding transformation matrices unlocks powerful control over visual elements in Novadesk, enabling complex animations and precise layout manipulations.

