import React, { useState } from 'react';
import { getConfigProperty, getUID, setConfig } from '../../utils/siteUtils';
import { CopyIcon, RefreshIcon } from './icons';
import acmeLogo from './images/acme.png'
import { CopyButton, HeaderWrapper, LogoWrapper, RefreshButton, StyledLabel } from './styled';

const Logo = () => {
	return (
		<LogoWrapper tabIndex="1">
			<a href="/">
				<img
				src={acmeLogo}
				tabIndex="-1"
				alt={'ACME logo'}
			/>
				<div>ENGINEERING</div>
			</a>
		</LogoWrapper>
	);
};

const UUID = () => {
	const [uuid, refreshUUID] = useState(getConfigProperty('userId'));
	return (
		<StyledLabel>
			<b>User ID:</b> {uuid}
			<RefreshButton
				onClick={() => {
					setConfig('userId', getUID(1));
					refreshUUID(getConfigProperty('userId'));
				}}
			>
				<RefreshIcon />
			</RefreshButton>
			<CopyButton onClick={() => navigator.clipboard.writeText(uuid)}>
				<CopyIcon />
			</CopyButton>
		</StyledLabel>
	);
};

const Header = () => {
	return (
		<HeaderWrapper>
			<Logo />
			Career Discovery and Placement engine
			<UUID />
		</HeaderWrapper>
	);
}

export default Header;
