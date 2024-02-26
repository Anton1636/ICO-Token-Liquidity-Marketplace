import React from 'react'
import {
	TiSocialPinterestCircular,
	TiSocialYoutube,
	TiSocialInstagram,
	TiSocialTwitter,
	TiSocialFacebook,
} from 'react-icons/ti'
import { footerIcon } from './index'

const Footer = () => {
	const social = [
		{
			link: '#',
			name: 'Facebook',
			icon: <TiSocialFacebook />,
		},
		{
			link: '#',
			name: 'Pinterest',
			icon: <TiSocialPinterestCircular />,
		},
		{
			link: '#',
			name: 'Youtube',
			icon: <TiSocialYoutube />,
		},
		{
			link: '#',
			name: 'Instagram',
			icon: <TiSocialInstagram />,
		},
		{
			link: '#',
			name: 'X',
			icon: <TiSocialTwitter />,
		},
	]

	return (
		<footer className='footer' id='site-footer'>
			<canvas id='can'></canvas>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-sm-offset-0 col-xs-12'>
						<div className='widget w-info'>
							<a href='/' className='site-logo'>
								<img src='img/logo-primary.png' alt='' />
								<footerIcon />
							</a>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
								nostrum aspernatur, accusamus aperiam dolorum in quaerat nulla
								praesentium eius labore libero.
							</p>
						</div>

						<div className='widget w-contacts'>
							<ul className='socials socials--white'>
								{social.map((social, index) => (
									<li key={index} className='social-item'>
										<a href={social.link} className='woox-icon'>
											{social.icon}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			<a href='#' className='back-to-top'>
				<svg className='woox-icon icon-top-arrow'>
					<use xlinkHref='#icon-top-arrow'></use>
				</svg>
			</a>
		</footer>
	)
}

export default Footer
