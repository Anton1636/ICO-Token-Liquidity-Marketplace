import React from 'react'

const ICOToken = () => {
	return (
		<section className='medium-padding100'>
			<div className='container'>
				<div className='row align-center' id='started'>
					<div className='col-lg-12 col-md-12 cols-sm-12 col-xs-12'>
						<div className='crumina-module crumina-module-slider pagination-bottom-center'>
							<div
								className='swiper-container'
								data-show-items='3'
								data-prev-next='1'
							>
								<div className='new_flex'>
									<div className='swiper-slide'>
										<div className='crumina-module crumina-pricing-table pricing-table--small'>
											<div className='pricing-thumb'>
												<img
													src='img/if_Bitcoin_2745023.png'
													className='woox-icon'
													alt=''
												/>
												<h5 className='pricing-title'>
													Bitcoin
													<span>BTC</span>
												</h5>

												<div className='gain-drop-arrow'>
													<svg className='woox-icon icon-arrow-up arrow-up active'>
														<use xlinkHref='#icon-arrow-up'></use>
													</svg>
													<svg className='woox-icon icon-arrow-down arrow-down active'>
														<use xlinkHref='#icon-arrow-down'></use>
													</svg>
												</div>
											</div>

											<div className='price'>
												<div className='price-sup-title'>Bitcoin equals:</div>
												<div className='price-value'>
													$51125.01
													<div className='growth'>+ 1.07%</div>
												</div>
											</div>

											<a className='btn btn--large btn--dark-lighter btn--transparent full-width'>
												Buy Bitcoin Now!
											</a>
										</div>
									</div>
									<div className='swiper-slide'>
										<div className='crumina-module crumina-pricing-table pricing-table--small'>
											<div className='pricing-thumb'>
												<img
													src='img/if_etherium_eth_ethcoin_crypto_2844386.png'
													className='woox-icon'
													alt=''
												/>
												<h5 className='pricing-title'>
													Ethereum
													<span>ETH</span>
												</h5>

												<div className='gain-drop-arrow'>
													<svg className='woox-icon icon-arrow-up arrow-up active'>
														<use xlinkHref='#icon-arrow-up'></use>
													</svg>
													<svg className='woox-icon icon-arrow-down arrow-down active'>
														<use xlinkHref='#icon-arrow-down'></use>
													</svg>
												</div>
											</div>

											<div className='price'>
												<div className='price-sup-title'>Ethereum equals:</div>
												<div className='price-value'>
													$3059.45
													<div className='growth'>+ 1.21%</div>
												</div>
											</div>

											<a className='btn btn--large btn--dark-lighter btn--transparent full-width'>
												Buy Ether Now!
											</a>
										</div>
									</div>
									<div className='swiper-slide'>
										<div className='crumina-module crumina-pricing-table pricing-table--small'>
											<div className='pricing-thumb'>
												<img
													src='img/if_dash_dashcoin_22844383.png'
													className='woox-icon'
													alt=''
												/>
												<h5 className='pricing-title'>
													Dash
													<span>Dash</span>
												</h5>

												<div className='gain-drop-arrow'>
													<svg className='woox-icon icon-arrow-up arrow-up active'>
														<use xlinkHref='#icon-arrow-up'></use>
													</svg>
													<svg className='woox-icon icon-arrow-down arrow-down active'>
														<use xlinkHref='#icon-arrow-down'></use>
													</svg>
												</div>
											</div>

											<div className='price'>
												<div className='price-sup-title'>Dash equals:</div>
												<div className='price-value'>
													$30.34
													<div className='growth'>+ 1.37%</div>
												</div>
											</div>

											<a className='btn btn--large btn--dark-lighter btn--transparent full-width'>
												Buy Dash Now!
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ICOToken
