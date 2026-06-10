/** @module PlanModal — Dialog for adding or editing a subscription plan. */
import { useEffect, useState } from 'react'
import {
  Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, Grid, IconButton, Switch, TextField, Tooltip, Typography
} from '@mui/material'
import { Close } from 'mdi-material-ui'
import { inputField, inputLabel, saveButton, cancelButton } from 'src/Styles'

// ── Default empty form ─────────────────────────────────────────────────────
const DEFAULT_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
const EMPTY_FORM = { name: '', price: '', duration: 30, maxEmployees: 50, badge: '', isPopular: false, gradient: DEFAULT_GRADIENT, features: [] }

// ── Gradient colour palette for the swatch picker ─────────────────────────
const GRADIENT_OPTIONS = [
  { label: 'Purple Dream',   value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { label: 'Ocean Blue',     value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { label: 'Rose Pink',      value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { label: 'Emerald Green',  value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { label: 'Sunset Orange',  value: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { label: 'Deep Red',       value: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)' },
  { label: 'Midnight',       value: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
  { label: 'Teal Breeze',    value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { label: 'Royal Blue',     value: 'linear-gradient(135deg, #2980b9 0%, #6dd5fa 100%)' },
  { label: 'Peachy Coral',   value: 'linear-gradient(135deg, #f9a826 0%, #f97f51 100%)' },
  { label: 'Lavender',       value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { label: 'Slate Gray',     value: 'linear-gradient(135deg, #5f6368 0%, #8a9bae 100%)' },
]

// ── Suggested features grouped by category ────────────────────────────────
const FEATURE_SUGGESTIONS = [
  { label: 'Attendance Management',   category: 'Core' },
  { label: 'Leave Management',        category: 'Core' },
  { label: 'Payroll Management',      category: 'Core' },
  { label: 'Employee Self-Service',   category: 'Core' },
  { label: 'Department Management',   category: 'Core' },
  { label: 'Role & Permission',       category: 'Core' },
  { label: 'Project Tracking',        category: 'Productivity' },
  { label: 'Task Management',         category: 'Productivity' },
  { label: 'Calendar & Events',       category: 'Productivity' },
  { label: 'Time Tracker',            category: 'Productivity' },
  { label: 'Basic Reports',           category: 'Reports' },
  { label: 'Advanced Reports',        category: 'Reports' },
  { label: 'Export to Excel/PDF',     category: 'Reports' },
  { label: 'API Access',              category: 'Integration' },
  { label: 'Email Notifications',     category: 'Integration' },
  { label: 'Email Support',           category: 'Support' },
  { label: 'Priority Support',        category: 'Support' },
  { label: '24/7 Phone Support',      category: 'Support' },
  { label: 'Dedicated Account Manager', category: 'Support' },
]

// Unique category list derived from suggestions
const CATEGORIES = ['All', ...new Set(FEATURE_SUGGESTIONS.map(f => f.category))]

/**
 * Modal for creating or editing a subscription plan.
 * @param {{ open, onClose, editPlan, onSave }} props
 * @returns {JSX.Element}
 */
const PlanModal = ({ open, onClose, editPlan, onSave }) => {
  const [form, setForm]               = useState(EMPTY_FORM)
  const [featureInput, setFeatureInput] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // ── Pre-fill when editing ────────────────────────────────────────────────
  useEffect(() => {
    if (editPlan) {
      setForm({
        name:         editPlan.name         || '',
        price:        editPlan.price        || '',
        duration:     editPlan.duration     || 30,
        maxEmployees: editPlan.maxEmployees || 50,
        badge:        editPlan.badge        || '',
        isPopular:    Boolean(editPlan.isPopular),
        gradient:     editPlan.gradient     || DEFAULT_GRADIENT,
        features:     Array.isArray(editPlan.features) ? editPlan.features : []
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setFeatureInput('')
    setActiveCategory('All')
  }, [editPlan, open])

  // ── Helpers ──────────────────────────────────────────────────────────────
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleToggle = e => setForm(prev => ({ ...prev, isPopular: e.target.checked }))

  const addFeature = () => {
    const trimmed = featureInput.trim()
    if (trimmed && !form.features.includes(trimmed)) {
      setForm(prev => ({ ...prev, features: [...prev.features, trimmed] }))
    }
    setFeatureInput('')
  }

  const removeFeature = feat =>
    setForm(prev => ({ ...prev, features: prev.features.filter(f => f !== feat) }))

  // Add a suggestion chip directly (ignored if already added)
  const addSuggestion = label => {
    if (!form.features.includes(label)) {
      setForm(prev => ({ ...prev, features: [...prev.features, label] }))
    }
  }

  const handleKeyDown = e => { if (e.key === 'Enter') { e.preventDefault(); addFeature() } }

  const handleSubmit = () => {
    if (!form.name || !form.price) return
    onSave({ ...form, price: Number(form.price), duration: Number(form.duration), maxEmployees: Number(form.maxEmployees), isPopular: form.isPopular ? 1 : 0, gradient: form.gradient || DEFAULT_GRADIENT })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm' scroll='body'>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography fontWeight={700}>{editPlan ? 'Edit Plan' : 'Add New Plan'}</Typography>
        <IconButton size='small' onClick={onClose}><Close /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3} mt={0}>
          {/* Plan Name */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Plan Name' name='name' variant='filled' size='small'
              value={form.name} onChange={handleChange} sx={{ ...inputField, ...inputLabel }} />
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Price (₹/month)' name='price' type='number' variant='filled' size='small'
              value={form.price} onChange={handleChange} sx={{ ...inputField, ...inputLabel }} />
          </Grid>

          {/* Duration */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Duration (days)' name='duration' type='number' variant='filled' size='small'
              value={form.duration} onChange={handleChange} sx={{ ...inputField, ...inputLabel }} />
          </Grid>

          {/* Max Employees */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Max Employees' name='maxEmployees' type='number' variant='filled' size='small'
              value={form.maxEmployees} onChange={handleChange} sx={{ ...inputField, ...inputLabel }}
              helperText='Use 99999 for unlimited' />
          </Grid>

          {/* Badge */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Badge Label (optional)' name='badge' variant='filled' size='small'
              placeholder='e.g. Most Popular, Best Value'
              value={form.badge} onChange={handleChange} sx={{ ...inputField, ...inputLabel }} />
          </Grid>

          {/* Popular Toggle */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={<Switch checked={form.isPopular} onChange={handleToggle} color='primary' />}
              label={<Typography variant='body2' fontWeight={600}>Mark as Popular</Typography>}
            />
          </Grid>

          {/* Card Colour / Gradient Picker */}
          <Grid item xs={12}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>Card Colour</Typography>
            <Typography variant='caption' color='text.secondary' display='block' mb={1.5}>
              Choose a gradient for the plan card header. The preview updates live below.
            </Typography>

            {/* Swatch grid */}
            <Box display='flex' flexWrap='wrap' gap={1.2} mb={2}>
              {GRADIENT_OPTIONS.map(opt => {
                const isSelected = form.gradient === opt.value
                return (
                  <Tooltip key={opt.value} title={opt.label} placement='top' arrow>
                    <Box
                      onClick={() => setForm(prev => ({ ...prev, gradient: opt.value }))}
                      sx={{
                        width: 40, height: 40, borderRadius: 2,
                        background: opt.value,
                        cursor: 'pointer',
                        border: isSelected ? '3px solid' : '3px solid transparent',
                        borderColor: isSelected ? 'primary.main' : 'transparent',
                        boxShadow: isSelected ? '0 0 0 2px white, 0 0 0 4px' : '0 2px 6px rgba(0,0,0,0.15)',
                        boxShadowColor: isSelected ? 'primary.main' : undefined,
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.15s, box-shadow 0.15s'
                      }}
                    />
                  </Tooltip>
                )
              })}
            </Box>

            {/* Live preview strip */}
            <Box sx={{
              height: 48, borderRadius: 2,
              background: form.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
            }}>
              <Typography variant='caption' fontWeight={700} color='#fff' sx={{ letterSpacing: 1, textTransform: 'uppercase' }}>
                {GRADIENT_OPTIONS.find(o => o.value === form.gradient)?.label || 'Custom'} — Preview
              </Typography>
            </Box>
          </Grid>

          {/* Features */}
          <Grid item xs={12}>
            <Typography variant='body2' fontWeight={600} mb={1}>Plan Features</Typography>

            {/* ── Custom feature input ─────────────────────────────────── */}
            <Box display='flex' gap={1} mb={2}>
              <TextField fullWidth label='Type a custom feature' variant='filled' size='small'
                value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={handleKeyDown}
                sx={{ ...inputField, ...inputLabel }} />
              <Button variant='contained' onClick={addFeature} sx={{ whiteSpace: 'nowrap', textTransform: 'none', px: 2 }}>
                Add
              </Button>
            </Box>

            {/* ── Suggestion box ───────────────────────────────────────── */}
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2, bgcolor: 'action.hover' }}>
              <Typography variant='caption' fontWeight={700} color='text.secondary' sx={{ textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Quick Suggestions
              </Typography>

              {/* Category filter tabs */}
              <Box display='flex' flexWrap='wrap' gap={0.8} mt={1} mb={1.5}>
                {CATEGORIES.map(cat => (
                  <Chip
                    key={cat}
                    label={cat}
                    size='small'
                    onClick={() => setActiveCategory(cat)}
                    color={activeCategory === cat ? 'primary' : 'default'}
                    variant={activeCategory === cat ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer', fontWeight: activeCategory === cat ? 700 : 400, fontSize: 11 }}
                  />
                ))}
              </Box>

              {/* Suggestion chips */}
              <Box display='flex' flexWrap='wrap' gap={0.8}>
                {FEATURE_SUGGESTIONS
                  .filter(s => activeCategory === 'All' || s.category === activeCategory)
                  .map(s => {
                    const alreadyAdded = form.features.includes(s.label)
                    return (
                      <Chip
                        key={s.label}
                        label={s.label}
                        size='small'
                        onClick={() => !alreadyAdded && addSuggestion(s.label)}
                        color={alreadyAdded ? 'success' : 'default'}
                        variant={alreadyAdded ? 'filled' : 'outlined'}
                        sx={{
                          cursor: alreadyAdded ? 'default' : 'pointer',
                          fontSize: 12,
                          opacity: alreadyAdded ? 0.7 : 1,
                          '&:hover': { bgcolor: alreadyAdded ? undefined : 'primary.light', color: alreadyAdded ? undefined : 'primary.contrastText' }
                        }}
                      />
                    )
                  })}
              </Box>
            </Box>

            {/* ── Added features ───────────────────────────────────────── */}
            <Typography variant='caption' fontWeight={600} color='text.secondary'>
              Added Features ({form.features.length})
            </Typography>
            <Box display='flex' flexWrap='wrap' gap={1} mt={0.8}>
              {form.features.map((feat, i) => (
                <Chip key={i} label={feat} onDelete={() => removeFeature(feat)} size='small' color='primary' variant='outlined' />
              ))}
              {form.features.length === 0 && (
                <Typography variant='caption' color='text.secondary' fontStyle='italic'>
                  No features added yet — type a custom one or pick from suggestions above.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant='outlined' sx={cancelButton}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained' disabled={!form.name || !form.price} sx={saveButton}>
          {editPlan ? 'Update Plan' : 'Add Plan'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PlanModal
