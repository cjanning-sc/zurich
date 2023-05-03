import React, { useState } from 'react';
import { getConfigProperty, getUID, setConfig } from '../../utils/siteUtils';
import { CopyIcon, RefreshIcon } from './icons';
import { CopyButton, HeaderWrapper, LogoWrapper, RefreshButton, StyledLabel } from './styled';

const Logo = ({ logo = "https://doc.sitecore.com/img/logo.svg", alt = "Sitecore Logo" }) => {
	return (
		<LogoWrapper href="/" className="logo" tabIndex="1">
			<img
				src={logo}
				tabIndex="-1"
				alt={alt}
			/>
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

const Header = ({ logo = "https://doc.sitecore.com/img/logo.svg", alt = "Sitecore Logo", }) => {
	return (
		<HeaderWrapper>
			<Logo
				logo={logo}
				alt={alt}
			/>
			<div style={{ color: 'white', fontWeight: '700', fontSize: '1.5rem', textAlign: 'left' }}>
				Career Discovery with Northrop Grummman
			</div>
			<UUID />
		</HeaderWrapper>
	);
}

export default Header;
