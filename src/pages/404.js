import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

class NotFoundIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title='404' desc='Page Not Found' />
        <div style={{ background: '#fff', textAlign:'center' }}>
          <div className="wrapper">
            <h1>404 Page Not Found</h1>
            <p>お探しのページは存在しないか、アクセスできません。</p>
            <p><Link to="/">ホームに戻る</Link></p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NotFoundIndex