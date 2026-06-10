import MuiCard from './card'
import MuiChip from './chip'
import MuiLink from './link'
import MuiList from './list'
import MuiMenu from './menu'
import MuiTabs from './tabs'
import MuiInput from './input'
import MuiPaper from './paper'
import MuiTable from './table'
import MuiAlerts from './alerts'
import MuiButton from './button'
import MuiDialog from './dialog'
import MuiRating from './rating'
import MuiSelect from './select'
import MuiAvatar from './avatars'
import MuiDivider from './divider'
import MuiPopover from './popover'
import MuiTooltip from './tooltip'
import MuiBackdrop from './backdrop'
import MuiSnackbar from './snackbar'
import MuiSwitches from './switches'
import MuiTimeline from './timeline'
import MuiAccordion from './accordion'
import MuiPagination from './pagination'
import MuiTypography from './typography'
import MuiToggleButton from './toggleButton'
import MuiDateTimePicker from './dateTimePicker'

const Overrides = theme => Object.assign(
  MuiChip(theme), MuiList(theme), MuiMenu(theme), MuiTabs(theme), MuiCard(theme),
  MuiInput(theme), MuiTable(theme), MuiAlerts(theme), MuiButton(theme), MuiRating(theme),
  MuiAvatar(theme), MuiDivider(theme), MuiDialog(theme), MuiPopover(theme), MuiTooltip(theme),
  MuiBackdrop(theme), MuiSnackbar(theme), MuiSwitches(theme), MuiTimeline(theme), MuiAccordion(theme),
  MuiPagination(theme), MuiDateTimePicker(theme),
  MuiLink, MuiPaper, MuiSelect, MuiTypography, MuiToggleButton
)

export default Overrides
