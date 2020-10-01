
import './ToolTipTemplate.css';

const ToolTipTemplate = (props) => {
	const data = props.data.object;
	return `
		<div className="tooltip">
			<h3>${data.Date}</h3>
			<p>A${data.Who} heads to the riding of ${data.Riding}.</p>
		</div>
	`;
};

export default ToolTipTemplate;